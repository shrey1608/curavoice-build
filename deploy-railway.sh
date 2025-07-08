#!/bin/bash

echo "🔨 Building CuraVoice for Railway deployment..."

# Build frontend locally
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Check if dist folder was created
if [ ! -d "frontend/dist" ]; then
    echo "❌ Frontend build failed - dist folder not found"
    exit 1
fi

echo "✅ Frontend built successfully"

# Copy the production Dockerfile
echo "📄 Setting up production Dockerfile..."
cp Dockerfile.production Dockerfile

echo "🚀 Ready for Railway deployment!"
echo ""
echo "Next steps:"
echo "1. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Add pre-built frontend for Railway'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Railway using the production Dockerfile"
echo ""
echo "Note: The frontend is now pre-built and included in your repository." 