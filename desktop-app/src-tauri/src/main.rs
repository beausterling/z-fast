// Prevents additional console window on Windows in release mode
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Child, Command};
use std::sync::Mutex;
use tauri::Manager;

struct AppState {
    python_process: Mutex<Option<Child>>,
}

// Start Python backend server
fn start_python_backend() -> Result<Child, std::io::Error> {
    #[cfg(target_os = "macos")]
    let python_cmd = "python3";

    #[cfg(target_os = "windows")]
    let python_cmd = "python";

    #[cfg(target_os = "linux")]
    let python_cmd = "python3";

    // Try to start the Python backend
    // In development, use the local backend
    // In production, use the bundled backend
    let backend_path = if cfg!(debug_assertions) {
        "../web-app/backend/main.py"
    } else {
        // In production, the backend is bundled in resources
        "python-backend/main.py"
    };

    println!("Starting Python backend from: {}", backend_path);

    Command::new(python_cmd)
        .arg(backend_path)
        .spawn()
}

// Check if backend is healthy
#[tauri::command]
async fn check_backend_health() -> Result<bool, String> {
    let client = reqwest::Client::new();
    match client
        .get("http://localhost:8000/health")
        .timeout(std::time::Duration::from_secs(2))
        .send()
        .await
    {
        Ok(response) => Ok(response.status().is_success()),
        Err(_) => Ok(false),
    }
}

// Get system info for optimizations
#[tauri::command]
fn get_system_info() -> serde_json::Value {
    let os = std::env::consts::OS;
    let arch = std::env::consts::ARCH;

    serde_json::json!({
        "os": os,
        "arch": arch,
        "is_macos": cfg!(target_os = "macos"),
        "is_windows": cfg!(target_os = "windows"),
        "is_linux": cfg!(target_os = "linux"),
    })
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            python_process: Mutex::new(None),
        })
        .setup(|app| {
            // Start Python backend on app startup
            match start_python_backend() {
                Ok(child) => {
                    println!("Python backend started successfully");
                    let state = app.state::<AppState>();
                    *state.python_process.lock().unwrap() = Some(child);
                }
                Err(e) => {
                    eprintln!("Failed to start Python backend: {}", e);
                    eprintln!("Please ensure Python and required packages are installed");
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            check_backend_health,
            get_system_info
        ])
        .on_window_event(|event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event.event() {
                // Clean up Python process on window close
                let app_handle = event.window().app_handle();
                let state = app_handle.state::<AppState>();
                if let Some(mut child) = state.python_process.lock().unwrap().take() {
                    let _ = child.kill();
                    println!("Python backend stopped");
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
