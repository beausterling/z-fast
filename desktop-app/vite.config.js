import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Optimize for Tauri
  clearScreen: false,

  server: {
    port: 3000,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**']
    }
  },

  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,

    // Optimize for speed
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },

  // Prevent vite from obscuring rust errors
  envPrefix: ['VITE_', 'TAURI_'],
})
