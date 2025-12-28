from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import torch
from diffusers import ZImagePipeline
import io
import base64
from PIL import Image
import asyncio
from functools import lru_cache

app = FastAPI(title="Z-Image API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@lru_cache(maxsize=1)
def get_pipeline():
    """Cached pipeline loader for speed"""
    pipe = ZImagePipeline.from_pretrained(
        "Tongyi-MAI/Z-Image-Turbo",
        torch_dtype=torch.bfloat16,
        low_cpu_mem_usage=False,
    )

    device = "cuda" if torch.cuda.is_available() else "cpu"
    pipe.to(device)

    # Enable flash attention if available
    try:
        pipe.transformer.set_attention_backend("flash")
    except:
        pass

    # Compile for faster inference (after first run)
    try:
        pipe.transformer.compile()
    except:
        pass

    return pipe

@app.on_event("startup")
async def startup_event():
    """Pre-load the model on startup"""
    print("Loading Z-Image pipeline...")
    get_pipeline()
    print("Pipeline loaded and ready!")

@app.get("/health")
async def health():
    return {"status": "ok", "model": "Z-Image-Turbo"}

@app.post("/generate")
async def generate_image(request: GenerateRequest):
    """Generate image from prompt - optimized for speed"""
    try:
        pipe = get_pipeline()

        # Set seed if provided
        generator = None
        if request.seed is not None:
            device = "cuda" if torch.cuda.is_available() else "cpu"
            generator = torch.Generator(device).manual_seed(request.seed)

        # Generate image
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
        image.save(buffered, format="PNG", optimize=False)  # Skip optimization for speed
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return {
            "image": f"data:image/png;base64,{img_str}",
            "prompt": request.prompt,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
