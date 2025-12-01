# ⚡ Z-Image Desktop App

**Ultra-fast, private AI image generation on your local machine.**

Generate stunning images in under a second with complete privacy. Everything runs locally - no cloud, no accounts, no data collection.

## 🎯 Features

- **⚡ Sub-Second Generation** - 1024x1024 images in <1 second on good hardware
- **🔒 100% Private** - All processing local, zero telemetry
- **💰 Free Forever** - No subscriptions, no API keys, unlimited generations
- **🍎 Mac Optimized** - Native Apple Silicon support with Metal Performance Shaders
- **🎨 Professional Quality** - 6B parameter Z-Image-Turbo model
- **📦 Self-Contained** - Tauri desktop app with embedded Python backend

## 🏗️ Architecture

```
Desktop App (Tauri + Rust)
    ↓
React Frontend (Neo-Brutalist UI)
    ↓
Local Python Backend (FastAPI)
    ↓
Z-Image-Turbo Model (PyTorch + MPS/CUDA)
```

## 📋 Requirements

### Recommended
- **macOS 10.13+** (Windows/Linux support coming)
- **16GB+ RAM** (unified memory on Apple Silicon)
- **Apple Silicon (M1/M2/M3)** or **NVIDIA GPU**
- **20GB free disk space** (for model + app)
- **Python 3.10+**

### Minimum (CPU fallback)
- **8GB RAM** (slower, 5-10s per image)
- **CPU only** (no GPU required but much slower)

## 🚀 Quick Start

### 1. Install Dependencies

**Install Rust (for Tauri):**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Install Python dependencies:**
```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Install Node.js dependencies:**
```bash
npm install
```

### 2. Development Mode

Run the app in development mode:

```bash
npm run tauri:dev
```

This will:
1. Start the Vite dev server
2. Launch the Tauri app
3. Start the Python backend automatically

The model will download automatically on first run (~12GB).

### 3. Build for Production

Build a distributable app:

```bash
npm run tauri:build
```

The built app will be in `src-tauri/target/release/bundle/`.

**On macOS:** You'll get a `.dmg` installer
**On Windows:** You'll get a `.msi` installer
**On Linux:** You'll get a `.deb` or `.AppImage`

## 🎨 Using the App

1. **Launch the app** - Backend starts automatically
2. **Wait for "READY" status** - Green indicator in top right
3. **Enter your prompt** - Describe what you want to create
4. **Hit Generate** or press Cmd/Ctrl+Enter
5. **Image appears instantly** - Usually <1 second on good hardware
6. **Save your image** - Click "SAVE IMAGE" button

## ⚙️ Configuration

### Model Settings

Edit `python-backend/main.py` to customize:

```python
# Change model (when other variants are released)
pipe = ZImagePipeline.from_pretrained(
    "Tongyi-MAI/Z-Image-Base",  # or Z-Image-Edit
    ...
)

# Adjust precision
torch_dtype=torch.float16  # vs bfloat16 or float32

# Enable/disable CPU offloading
pipe.enable_model_cpu_offload()  # For memory-constrained devices
```

### UI Customization

Neo-brutalist design in `src/index.css`:

```css
:root {
  --yellow: #FFFF00;  /* Change primary color */
  --cyan: #00FFFF;    /* Change accent color */
  /* Customize your style! */
}
```

## 🔧 Troubleshooting

### "Backend is starting..." stuck

**Solution**: Check Python backend manually:

```bash
cd python-backend
python3 main.py
```

Look for errors. Common issues:
- Missing dependencies: `pip install -r requirements.txt`
- Python version: Requires 3.10+
- Model download failed: Check internet connection

### Out of Memory (OOM)

**Solutions**:
1. Enable CPU offloading (in `python-backend/main.py`)
2. Reduce image dimensions (try 768x768 or 512x512)
3. Close other applications
4. Upgrade RAM if possible

### Slow Generation (>5 seconds)

**Possible causes**:
- Running on CPU (no GPU detected)
- First generation (model compilation)
- Insufficient RAM (swapping to disk)

**Solutions**:
1. Check device status in app (shows GPU/CPU)
2. Wait for first generation (compiles once)
3. Close memory-intensive apps
4. Reduce dimensions

### macOS: "App is damaged" error

**Solution**: Remove quarantine attribute:

```bash
xattr -cr /Applications/Z-Image\ Generator.app
```

## 🏎️ Performance Tips

### For Maximum Speed:

1. **Use Apple Silicon or NVIDIA GPU** - 10-20x faster than CPU
2. **16GB+ RAM** - Prevents memory swapping
3. **Keep dimensions at 1024x1024** - Model's native resolution
4. **Use default steps (9)** - Optimal for Turbo model
5. **Close other apps** - More RAM for the model

### Expected Performance:

| Hardware | 1024x1024 | 768x768 | 512x512 |
|----------|-----------|---------|---------|
| M3 Pro/Max | 0.8-1.2s | 0.5-0.8s | 0.3-0.5s |
| M2 16GB | 1.2-1.8s | 0.8-1.2s | 0.5-0.8s |
| M1 16GB | 1.5-2.5s | 1.0-1.5s | 0.6-1.0s |
| RTX 4090 | 0.5-0.8s | 0.3-0.5s | 0.2-0.3s |
| RTX 3080 | 1.0-1.5s | 0.6-1.0s | 0.4-0.6s |
| CPU only | 8-15s | 5-10s | 3-6s |

## 🔒 Privacy & Security

- **No telemetry** - Zero analytics or tracking
- **No network calls** - Except for model download (one-time)
- **Local processing** - Everything runs on your machine
- **No accounts** - No sign-up, no login
- **Open source** - Audit the code yourself

## 📦 File Structure

```
desktop-app/
├── src/                    # React frontend
│   ├── App.jsx            # Main UI component
│   └── index.css          # Neo-brutalist styles
├── src-tauri/             # Rust/Tauri backend
│   ├── src/main.rs        # App lifecycle + Python launcher
│   ├── tauri.conf.json    # Tauri configuration
│   └── Cargo.toml         # Rust dependencies
├── python-backend/        # Python inference server
│   ├── main.py            # FastAPI + Z-Image
│   └── requirements.txt   # Python dependencies
└── package.json           # Node.js scripts
```

## 🤝 Contributing

Contributions welcome! This is open source.

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

Follows the Z-Image repository license.

## 🙏 Credits

- **Z-Image-Turbo** by Tongyi-MAI
- **Tauri** for the desktop framework
- **PyTorch** for ML infrastructure
- **Diffusers** by Hugging Face

## 🆘 Support

Issues? Check:
1. [GitHub Issues](https://github.com/beausterling/z-fast/issues)
2. [Z-Image Official Site](https://tongyi-mai.github.io/Z-Image-blog/)
3. [Troubleshooting section](#-troubleshooting) above

---

**Built for speed. Designed for privacy. Made with love. ⚡🔒❤️**
