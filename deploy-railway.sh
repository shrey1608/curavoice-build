#!/bin/bash

echo "🔨 Building CuraVoice for Railway deployment..."

# Build frontend using Docker (since npm/yarn not available locally)
echo "📦 Building frontend with Docker..."

# Create a temporary Docker build for frontend only
cat > Dockerfile.frontend-build << 'EOF'
FROM node:18-alpine
WORKDIR /frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./frontend/ ./
RUN yarn build
EOF

# Build frontend using Docker
docker build -f Dockerfile.frontend-build -t frontend-builder .

# Extract the built files from the Docker container
echo "📤 Extracting built frontend files..."
docker run --rm -v "$(pwd)/frontend:/host-frontend" frontend-builder sh -c "cp -r /frontend/dist /host-frontend/"

# Clean up temporary files
rm Dockerfile.frontend-build

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