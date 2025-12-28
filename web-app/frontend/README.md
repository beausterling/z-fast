# 🎨 Z-Image Frontend

Neo-brutalist web interface for Z-Image AI generation.

## 🚀 Quick Deploy to Netlify

### Method 1: Netlify UI (Recommended)

1. **Push code to GitHub** ✅ (Already done!)

2. **Deploy to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select your repository
   - Configure:
     ```
     Base directory: web-app/frontend
     Build command: npm run build
     Publish directory: web-app/frontend/dist
     ```
   - Click "Deploy site"

3. **Add environment variable** (after backend is deployed):
   - Site settings → Environment variables
   - Add: `VITE_API_URL` = your backend URL

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd web-app/frontend
netlify deploy --prod
```

### Method 3: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create `.env.local`:

```bash
# Backend API URL
VITE_API_URL=/api  # For local development
# VITE_API_URL=https://your-backend.com  # For production
```

## 📦 Build Output

Production build creates optimized files in `dist/`:
- Minified JS/CSS
- Optimized images
- Pre-compressed assets
- Fast loading times

## 🎨 Customization

### Colors

Edit `src/index.css`:

```css
:root {
  --black: #000000;
  --white: #FFFFFF;
  --yellow: #FFFF00;  /* Primary action */
  --cyan: #00FFFF;    /* Focus state */
  --magenta: #FF00FF; /* Badges */
  /* Add your own! */
}
```

### Typography

Change font in `src/index.css`:

```css
body {
  font-family: 'Your Font', monospace;
}
```

### Layout

Modify grid in `src/App.jsx`:

```jsx
<div className="grid grid-2">  {/* 2 columns */}
```

## 🌐 Connecting to Backend

The frontend expects these backend endpoints:

- `POST /generate` - Generate image from prompt
- `GET /health` - Health check

Configure the backend URL via `VITE_API_URL` environment variable.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔗 Related

- [Main README](../README.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Backend README](../backend/)

---

**Built with React + Vite. Styled with pure CSS. Designed for speed. ⚡**
