"""
Z-Image Desktop Backend - Optimized for Local Execution
Supports CUDA (NVIDIA), MPS (Apple Silicon), and CPU
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from diffusers import ZImagePipeline
import io
import base64
from PIL import Image
from functools import lru_cache
import platform

app = FastAPI(title="Z-Image Desktop API")

# Allow local connections only for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:*", "tauri://localhost", "http://tauri.localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str
    width: int = 1024
    height: int = 1024
    num_inference_steps: int = 9
    seed: int | None = None

def get_optimal_device():
    """Detect best available compute device"""
    if torch.cuda.is_available():
        return "cuda", "NVIDIA GPU"
    elif torch.backends.mps.is_available():
        return "mps", "Apple Silicon (Metal)"
    else:
        return "cpu", "CPU (slow)"

@lru_cache(maxsize=1)
def get_pipeline():
    """Cached pipeline loader - optimized for each platform"""
    device, device_name = get_optimal_device()

    print(f"🚀 Loading Z-Image-Turbo on {device_name}...")

    # Use appropriate dtype for each device
    if device == "mps":
        # MPS works best with float16
        dtype = torch.float16
    elif device == "cuda":
        # CUDA prefers bfloat16 if available
        dtype = torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16
    else:
        # CPU uses float32
        dtype = torch.float32

    pipe = ZImagePipeline.from_pretrained(
        "Tongyi-MAI/Z-Image-Turbo",
        torch_dtype=dtype,
        low_cpu_mem_usage=True,
    )

    pipe.to(device)

    # Platform-specific optimizations
    if device == "cuda":
        # Enable flash attention on NVIDIA
        try:
            pipe.transformer.set_attention_backend("flash")
            print("✅ Flash Attention enabled")
        except:
            print("⚠️  Flash Attention not available")

        # Compile for faster inference
        try:
            pipe.transformer.compile()
            print("✅ Model compilation enabled")
        except:
            print("⚠️  Model compilation not available")

    elif device == "mps":
        # MPS-specific optimizations
        print("✅ Using Metal Performance Shaders")
        # Enable CPU offloading for memory efficiency on Mac
        try:
            pipe.enable_model_cpu_offload()
            print("✅ CPU offloading enabled for memory efficiency")
        except:
            pass

    else:
        # CPU fallback
        print("⚠️  Running on CPU - this will be slow!")
        pipe.enable_model_cpu_offload()

    print(f"✅ Pipeline ready on {device_name}!")
    return pipe, device

@app.on_event("startup")
async def startup_event():
    """Pre-load the model on startup"""
    print("=" * 50)
    print("🎨 Z-Image Desktop Backend")
    print("=" * 50)
    print(f"Platform: {platform.system()} {platform.machine()}")
    get_pipeline()
    print("=" * 50)
    print("✅ Ready to generate images!")
    print("=" * 50)

@app.get("/health")
async def health():
    device, device_name = get_optimal_device()
    return {
        "status": "ok",
        "model": "Z-Image-Turbo",
        "device": device,
        "device_name": device_name,
        "platform": platform.system(),
        "architecture": platform.machine()
    }

@app.post("/generate")
async def generate_image(request: GenerateRequest):
    """Generate image - optimized for speed and privacy"""
    try:
        pipe, device = get_pipeline()

        # Set seed if provided
        generator = None
        if request.seed is not None:
            generator = torch.Generator(device).manual_seed(request.seed)

        # Generate image
        with torch.inference_mode():  # Faster inference
            image = pipe(
                prompt=request.prompt,
                height=request.height,
                width=request.width,
                num_inference_steps=request.num_inference_steps,
                guidance_scale=0.0,  # Turbo models use 0 guidance
                generator=generator,
            ).images[0]

        # Convert to base64 for fast transfer
        buffered = io.BytesIO()
        image.save(buffered, format="PNG", optimize=False)
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return {
            "image": f"data:image/png;base64,{img_str}",
            "prompt": request.prompt,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    print("\n🚀 Starting Z-Image Desktop Backend...")
    print("⚡ Privacy-first: All processing happens locally")
    print("🔒 No data leaves your machine\n")

    uvicorn.run(
        app,
        host="127.0.0.1",  # Local only for security
        port=8000,
        log_level="info"
    )
