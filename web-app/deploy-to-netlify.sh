#!/bin/bash

# Z-Image Web App - Netlify Deployment Script
# This script automates the deployment of the frontend to Netlify

set -e  # Exit on error

echo "⚡ Z-Image Netlify Deployment"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the web-app directory"
    echo "   cd web-app && ./deploy-to-netlify.sh"
    exit 1
fi

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
else
    echo "✅ Netlify CLI already installed"
fi

# Navigate to frontend
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy
echo "🚀 Deploying to Netlify..."
echo ""
echo "Choose deployment option:"
echo "1) Deploy to production (requires Netlify login)"
echo "2) Deploy preview (draft)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "Deploying to production..."
        netlify deploy --prod
        ;;
    2)
        echo "Deploying preview..."
        netlify deploy
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Deploy your backend (see ../DEPLOYMENT.md)"
echo "2. Update VITE_API_URL environment variable in Netlify dashboard"
echo "3. Trigger a redeploy to use the new backend URL"
echo ""
echo "🔗 Deployment guide: ../DEPLOYMENT.md"
