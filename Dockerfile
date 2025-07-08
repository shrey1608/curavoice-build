# Ultra-light build for Railway with minimal memory usage
FROM node:18-alpine AS frontend_builder

WORKDIR /frontend

# Copy package files
COPY ./frontend/package.json ./frontend/package-lock.json* ./frontend/yarn.lock* ./

# Install only production dependencies to reduce memory
RUN npm ci --only=production --no-audit --no-fund --maxsockets 1

# Copy source files in stages to reduce memory pressure
COPY ./frontend/src ./src
COPY ./frontend/public ./public
COPY ./frontend/index.html ./
COPY ./frontend/tsconfig.json ./
COPY ./frontend/tsconfig.node.json ./
COPY ./frontend/vite.config.ts ./

# Ultra-aggressive memory optimization
ENV NODE_OPTIONS="--max-old-space-size=384 --optimize-for-size --gc-interval=100"
RUN npm run build

# Minimal Python backend
FROM python:3.10-slim

WORKDIR /app

# Minimize workers for Railway
ENV MAX_WORKERS=1
ENV WEB_CONCURRENCY=1

# Skip ffmpeg for now to reduce memory usage during build
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends ffmpeg && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# Install Python dependencies with minimal overhead
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./backend .

# Copy built frontend with minimal footprint
COPY --from=frontend_builder /frontend/dist ./frontend/dist

# Use uvicorn directly instead of gunicorn wrapper
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
