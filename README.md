<h1 align="center">⚡️ Z-Image<br><sub><sup>Ultra-Fast Local AI Image Generation</sup></sub></h1>

<div align="center">

[![Official Site](https://img.shields.io/badge/Official%20Site-333399.svg?logo=homepage)](https://tongyi-mai.github.io/Z-Image-blog/)
[![Desktop App](https://img.shields.io/badge/Desktop%20App-Download-00FF00)](./desktop-app)
[![Landing Page](https://img.shields.io/badge/Landing%20Page-Live-FFFF00)](./landing-page)
[![Web App](https://img.shields.io/badge/Web%20App-Deploy-00FFFF)](./web-app)

**Fast. Private. Free. Open Source.**

This repository contains three ways to use Z-Image-Turbo:
1. 🖥️ **Desktop App** - Native macOS/Windows/Linux app (Tauri)
2. 🌐 **Web App** - Browser-based interface (React + FastAPI)
3. 🎨 **Landing Page** - Marketing site for the desktop app

</div>

---

## 🚀 Quick Links

### For End Users
- **[Desktop App →](./desktop-app)** - Download and run locally (recommended)
- **[Landing Page →](./landing-page)** - Learn more about Z-Image

### For Developers
- **[Web App →](./web-app)** - Deploy your own web version
- **[Original Z-Image Docs](#-original-z-image-documentation)** - Model information

---

## 🖥️ Desktop App (Recommended)

<div align="center">

### ⚡ SUB-SECOND • 🔒 100% PRIVATE • 💰 FREE FOREVER

</div>

**Native desktop application for macOS, Windows, and Linux.**

### Features
- ⚡ **Blazing fast** - Generate 1024x1024 images in <1 second
- 🔒 **Completely private** - All processing local, no cloud
- 🍎 **Mac optimized** - Native Apple Silicon support with Metal
- 🎨 **Professional quality** - 6B parameter Z-Image-Turbo model
- 📦 **Self-contained** - Tauri desktop app with embedded Python backend

### Quick Start

```bash
cd desktop-app
npm install
npm run tauri:dev
```

**[Full Desktop App Documentation →](./desktop-app/README.md)**

---

## 🌐 Web App

**Browser-based interface with cloud deployment options.**

### Features
- 🎨 Neo-brutalist design
- ⚡ Optimized for speed
- 📱 Responsive (mobile, tablet, desktop)
- 🚀 Easy deployment (Netlify, Vercel, etc.)

### Quick Start

**Backend:**
```bash
cd web-app/backend
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd web-app/frontend
npm install
npm run dev
```

**[Full Web App Documentation →](./web-app/README.md)**

**[Deployment Guide →](./web-app/DEPLOYMENT.md)**

---

## 🎨 Landing Page

**High-converting marketing page for the desktop app.**

Bold neo-brutalist design that emphasizes speed, privacy, and zero cost.

### Quick Start

```bash
cd landing-page
npm install
npm run dev
```

### Deploy to Netlify

1. Push to GitHub
2. Connect to Netlify
3. Configure: Base directory: `landing-page`, Build: `npm run build`, Publish: `landing-page/dist`

**[Landing Page Documentation →](./landing-page/README.md)**

---

## 📊 Comparison

| Feature | Desktop App | Web App | Original Python |
|---------|-------------|---------|-----------------|
| **Speed** | ⚡⚡⚡ Sub-second | ⚡⚡ Fast | ⚡⚡⚡ Fast |
| **Privacy** | 🔒 100% Local | ☁️ Depends on deployment | 🔒 100% Local |
| **Ease of Use** | 📦 Install & run | 🌐 Access from browser | 💻 CLI |
| **UI** | 🎨 Native app | 🎨 Web interface | ❌ None |
| **Platform** | macOS/Windows/Linux | Any with browser | Any with Python |
| **Best For** | Personal use | Sharing with others | Development |

---

## 🎯 Which One to Use?

### Use Desktop App if you want:
- ✅ Maximum speed and privacy
- ✅ No server setup/hosting
- ✅ Native app experience
- ✅ Offline usage after model download

### Use Web App if you want:
- ✅ Share with others (deploy to cloud)
- ✅ No local installation required
- ✅ Access from any device
- ✅ Custom branding/styling

### Use Original Python if you want:
- ✅ Integrate into your own code
- ✅ Batch processing
- ✅ Custom workflows
- ✅ Maximum control

---

## ⚡️ Original Z-Image Documentation

Z-Image is a powerful and highly efficient image generation model with **6B** parameters.

### Model Variants

- 🚀 **Z-Image-Turbo** – A distilled version that matches or exceeds leading competitors with only **8 NFEs** (Number of Function Evaluations). It offers **⚡️sub-second inference latency⚡️** on enterprise-grade H800 GPUs and fits comfortably within **16G VRAM consumer devices**.

- 🧱 **Z-Image-Base** – The non-distilled foundation model (coming soon)

- ✍️ **Z-Image-Edit** – Fine-tuned for image editing tasks (coming soon)

### Model Zoo

| Model | Hugging Face | ModelScope |
| :--- | :--- | :--- |
| **Z-Image-Turbo** | [![HF](https://img.shields.io/badge/%F0%9F%A4%97%20Checkpoint-Z--Image--Turbo-yellow)](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) | [![MS](https://img.shields.io/badge/🤖%20Checkpoint-Z--Image--Turbo-624aff)](https://www.modelscope.cn/models/Tongyi-MAI/Z-Image-Turbo) |

### Original Quick Start

```python
import torch
from diffusers import ZImagePipeline

pipe = ZImagePipeline.from_pretrained(
    "Tongyi-MAI/Z-Image-Turbo",
    torch_dtype=torch.bfloat16,
)
pipe.to("cuda")  # or "mps" for Mac, "cpu" for CPU

image = pipe(
    prompt="Your prompt here",
    height=1024,
    width=1024,
    num_inference_steps=9,
    guidance_scale=0.0,
).images[0]

image.save("output.png")
```

### Key Papers

- **Z-Image**: [![arXiv](https://img.shields.io/badge/Paper-b5212f.svg?logo=arxiv)](https://arxiv.org/abs/2511.22699)
- **Decoupled-DMD**: [![arXiv](https://img.shields.io/badge/Paper-b5212f.svg?logo=arxiv)](https://arxiv.org/abs/2511.22677)
- **DMDR**: [![arXiv](https://img.shields.io/badge/arXiv-2511.13649-b31b1b.svg)](https://arxiv.org/abs/2511.13649)

### Community Works

- [Cache-DiT](https://github.com/vipshop/cache-dit) - Inference acceleration with DBCache
- [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) - Pure C++ inference engine (4GB VRAM!)

---

## 🏗️ Tech Stack

### Desktop App
- **Tauri** - Lightweight native app framework (Rust)
- **React** - UI framework
- **Python** - ML inference backend
- **PyTorch** - ML framework
- **FastAPI** - Backend API

### Web App
- **React** - Frontend framework
- **Vite** - Build tool
- **FastAPI** - Backend API
- **Diffusers** - Hugging Face pipelines

### Landing Page
- **React** - UI framework
- **Vite** - Build tool
- **Netlify** - Deployment

---

## 📋 System Requirements

### Recommended
- **macOS 10.13+** (Windows/Linux support for desktop app coming)
- **16GB+ RAM** (unified memory on Apple Silicon)
- **Apple Silicon (M1/M2/M3)** or **NVIDIA GPU**
- **20GB free disk space**
- **Python 3.10+**

### Minimum
- **8GB RAM** (slower, ~5-10s per image)
- **CPU only** (no GPU required but much slower)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📜 License

This project follows the Z-Image repository license.

---

## 🙏 Credits

- **Z-Image-Turbo** by [Tongyi-MAI](https://github.com/Tongyi-MAI)
- **Diffusers** by Hugging Face
- **Tauri** for the desktop framework
- **FastAPI** by Sebastián Ramírez
- **React** by Meta
- All contributors to this project

---

## 🆘 Support

- [Desktop App Issues](./desktop-app/README.md#-troubleshooting)
- [Web App Deployment Help](./web-app/DEPLOYMENT.md)
- [GitHub Issues](https://github.com/beausterling/z-fast/issues)
- [Original Z-Image Site](https://tongyi-mai.github.io/Z-Image-blog/)

---

<div align="center">

**Built for speed. Designed for privacy. Made with love.**

⚡🔒❤️

[![Star History](https://api.star-history.com/svg?repos=beausterling/z-fast&type=date)](https://star-history.com/#beausterling/z-fast&Date)

</div>
