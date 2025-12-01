# 🚀 Deployment Guide

This guide covers deploying your Z-Image web app to production.

## 📋 Overview

- **Frontend**: Deploy to Netlify (or Vercel, Cloudflare Pages)
- **Backend**: Requires GPU hosting (see options below)

## 🎨 Frontend Deployment to Netlify

### Option 1: Deploy via Netlify UI (Easiest)

1. **Push your code to GitHub** (already done! ✅)

2. **Go to Netlify**:
   - Visit https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure build settings**:
   ```
   Base directory: web-app/frontend
   Build command: npm run build
   Publish directory: web-app/frontend/dist
   ```

4. **Add environment variable**:
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`
   - (We'll update this once the backend is deployed)

5. **Deploy!**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend directory
cd web-app/frontend

# Deploy
netlify deploy --prod
```

Follow the prompts:
- Create & configure new site: Yes
- Publish directory: `dist`

### Update API URL

After deploying the backend (see below), update the environment variable:

1. Netlify Dashboard → Site settings → Environment variables
2. Update `VITE_API_URL` to your backend URL
3. Trigger a redeploy

## 🖥️ Backend Deployment Options

The backend requires **GPU hosting** for good performance. Here are your options:

### Option 1: 🏆 Hugging Face Spaces (Recommended - FREE!)

**Pros**: Free GPU, easy setup, integrated with Hugging Face ecosystem

**Steps**:

1. Go to https://huggingface.co/spaces
2. Create new Space:
   - Name: `z-image-api`
   - License: Your choice
   - SDK: **Docker**
   - Hardware: **T4 small (free)** or upgrade for faster inference

3. Create `Dockerfile` in your space:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY main.py .

# Expose port
EXPOSE 7860

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

4. Upload your `backend/main.py` and `backend/requirements.txt`

5. Update `main.py` port to 7860 (Hugging Face default)

6. Your API will be at: `https://your-username-z-image-api.hf.space`

### Option 2: Replicate (Pay-per-use)

**Pros**: Only pay when generating images, no idle costs

**Steps**:

1. Visit https://replicate.com
2. Create account and add payment method
3. Deploy model as a Cog container
4. API will be available at Replicate endpoint

**Cost**: ~$0.002-0.01 per image generation

### Option 3: Modal (Serverless GPU)

**Pros**: Auto-scaling, pay-per-second, very fast cold starts

**Steps**:

```bash
pip install modal

# Create modal_app.py
modal deploy modal_app.py
```

**Cost**: ~$0.0001 per second of GPU usage

### Option 4: RunPod (Cheap GPU Cloud)

**Pros**: Cheapest dedicated GPU option ($0.20-0.50/hr)

**Steps**:

1. Go to https://www.runpod.io
2. Deploy pod with GPU (RTX 3090, RTX 4090, or A4000)
3. Use their template or upload Docker image
4. Expose port 8000

**Cost**: $0.20-0.50/hour depending on GPU

### Option 5: Railway (Simple Deploy)

**Pros**: Easy deploy, GitHub integration

**Cons**: More expensive GPUs

**Steps**:

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Add GPU addon
5. Set root directory to `web-app/backend`

### Option 6: Google Cloud Run / AWS Lambda (⚠️ NOT Recommended)

**Why not**: No GPU support, too slow for real-time generation

### Option 7: Self-Hosted (Own GPU Server)

If you have a machine with GPU:

**Docker Deployment**:

```bash
cd web-app/backend

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Build and run
docker build -t z-image-backend .
docker run -p 8000:8000 --gpus all z-image-backend
```

**Expose with ngrok (for testing)**:
```bash
ngrok http 8000
```

## 🔗 Connecting Frontend to Backend

Once backend is deployed:

1. **Get your backend URL** (e.g., `https://your-space.hf.space`)

2. **Update Netlify environment variable**:
   - Go to Netlify Dashboard
   - Site settings → Environment variables
   - Set `VITE_API_URL` = `https://your-backend-url.com`

3. **Redeploy frontend**:
   - Netlify will auto-redeploy when you push to git
   - Or trigger manual redeploy from dashboard

4. **Update CORS in backend** if needed:
   - Add your Netlify URL to allowed origins in `main.py`

## 🧪 Testing Your Deployment

1. Visit your Netlify URL
2. Enter a prompt
3. Click generate
4. Image should appear in <1 second (if using good GPU)

## 💰 Cost Comparison

| Service | Free Tier | Pay-as-you-go | Always-on |
|---------|-----------|---------------|-----------|
| **Hugging Face Spaces** | ✅ T4 GPU | N/A | N/A |
| **Replicate** | $5 credit | ~$0.005/image | N/A |
| **Modal** | $10/month | ~$0.01/image | N/A |
| **RunPod** | ❌ | N/A | ~$0.20-0.50/hr |
| **Railway** | Limited | N/A | ~$2-5/hr |

## 🏆 Recommended Setup

**For testing/personal use**:
- Frontend: Netlify (free)
- Backend: Hugging Face Spaces with free T4 GPU

**For production (low traffic)**:
- Frontend: Netlify (free)
- Backend: Replicate (pay per image)

**For production (high traffic)**:
- Frontend: Netlify or Cloudflare Pages
- Backend: RunPod or self-hosted GPU server

## 🔒 Security Notes

1. **Add rate limiting** to prevent abuse
2. **Add authentication** if needed
3. **Monitor costs** on paid services
4. **Set spending limits** on cloud platforms
5. **Use environment variables** for all secrets

## 🐛 Troubleshooting

### "Failed to fetch" error

- Check CORS settings in backend
- Verify backend is running
- Check `VITE_API_URL` environment variable

### Slow generation

- Upgrade to better GPU
- Check if using CPU instead of GPU
- Enable model compilation and Flash Attention

### Out of memory

- Use smaller image dimensions
- Enable CPU offloading
- Upgrade to GPU with more VRAM

## 📚 Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces)
- [Replicate Docs](https://replicate.com/docs)
- [Modal Docs](https://modal.com/docs)
- [RunPod Docs](https://docs.runpod.io)

---

Need help? Check the main README or create an issue on GitHub!
