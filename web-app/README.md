# ⚡️ Z-Image Web App

A blazing-fast, neo-brutalist web application for AI image generation powered by Z-Image-Turbo.

## 🎯 Features

- **⚡ Ultra-Fast Generation**: Sub-second image generation with Z-Image-Turbo
- **🎨 Neo-Brutalist Design**: Bold, stark, and unapologetically fast UI
- **📱 Responsive**: Works on desktop, tablet, and mobile
- **🎛️ Full Control**: Adjust dimensions, steps, and seed
- **💾 Easy Download**: One-click image download
- **🚀 Optimized for Speed**:
  - No unnecessary animations or transitions
  - Cached model loading
  - Optimized image transfer (base64)
  - Vite for instant HMR
  - FastAPI for async performance

## 🏗️ Architecture

```
web-app/
├── frontend/          # React + Vite web interface
│   ├── src/
│   │   ├── App.jsx   # Main application component
│   │   ├── main.jsx  # Entry point
│   │   └── index.css # Neo-brutalist styles
│   └── package.json
└── backend/           # FastAPI server
    ├── main.py       # API endpoints + Z-Image inference
    └── requirements.txt
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+** with CUDA support (for GPU acceleration)
- **Node.js 18+** and npm
- **GPU with 16GB+ VRAM** recommended (can run on CPU but much slower)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd web-app/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

**Note**: The first run will download the Z-Image-Turbo model (~12GB). This may take several minutes depending on your internet connection.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd web-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 🎨 Design Philosophy

### Neo-Brutalism Principles

1. **Bold & Stark**: High contrast colors, thick borders
2. **No Fluff**: Zero unnecessary animations or transitions
3. **Fast First**: Every design decision optimized for speed
4. **Honest**: Raw, unpolished aesthetic that prioritizes function
5. **Loud**: Strong typography, uppercase text, maximum impact

### Speed Optimizations

- **Model Caching**: Pipeline loaded once and cached in memory
- **Compiled Transformers**: Model compilation for faster inference
- **Flash Attention**: Enabled when available for GPU acceleration
- **Zero Animations**: Removed all CSS transitions/animations
- **Optimized Images**: Base64 transfer without PNG optimization
- **Vite Build**: Fastest bundler with ESBuild minification
- **FastAPI**: Async Python framework for maximum throughput

## 🔌 API Endpoints

### POST `/generate`

Generate an image from a text prompt.

**Request Body:**
```json
{
  "prompt": "A futuristic city at night",
  "width": 1024,
  "height": 1024,
  "num_inference_steps": 9,
  "seed": 42
}
```

**Response:**
```json
{
  "image": "data:image/png;base64,...",
  "prompt": "A futuristic city at night"
}
```

### GET `/health`

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "model": "Z-Image-Turbo"
}
```

## 🎛️ Configuration

### Backend (`backend/main.py`)

- **Model**: Change `Tongyi-MAI/Z-Image-Turbo` to use different checkpoints
- **Device**: Automatically uses CUDA if available, falls back to CPU
- **Attention**: Flash Attention 2/3 enabled when available
- **Compilation**: Transformer compilation for faster inference

### Frontend (`frontend/src/App.jsx`)

- **Default Dimensions**: 1024x1024 (modify `width`/`height` state)
- **Default Steps**: 9 (optimal for Turbo model)
- **API URL**: Configured in `vite.config.js` proxy

## 📦 Production Build

### Frontend

```bash
cd web-app/frontend
npm run build
```

Built files will be in `frontend/dist/`

Serve with any static file server:
```bash
npm run preview
```

### Backend

For production, use a production ASGI server:

```bash
pip install gunicorn
gunicorn main:app -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Note**: Use `-w 1` (single worker) to avoid loading the model multiple times.

## 🐛 Troubleshooting

### Model Download Issues

If the model fails to download, you can manually download it:

```python
from diffusers import ZImagePipeline
pipe = ZImagePipeline.from_pretrained("Tongyi-MAI/Z-Image-Turbo")
```

### Out of Memory (OOM)

If you encounter OOM errors:

1. Enable CPU offloading in `backend/main.py`:
```python
pipe.enable_model_cpu_offload()
```

2. Reduce image dimensions to 768x768 or 512x512

3. Use CPU inference (slower but works with less VRAM)

### CORS Issues

If you encounter CORS errors, ensure the backend CORS middleware is properly configured in `main.py`.

## 🚀 Next Steps for Mobile (React Native + Expo)

The current web app can be adapted to React Native with:

1. Replace `fetch` with React Native's networking
2. Use `react-native-fast-image` for optimized image display
3. Implement native download with `react-native-fs`
4. Keep the same FastAPI backend
5. Deploy backend to a cloud service (AWS/GCP/Vercel)

## 📄 License

This project follows the Z-Image repository license.

## 🙏 Credits

- **Z-Image-Turbo** by Tongyi-MAI
- **Diffusers** by Hugging Face
- **FastAPI** by Sebastián Ramírez
- **Vite** by Evan You
- **React** by Meta

---

**Built for speed. Designed to be brutally fast. ⚡**
