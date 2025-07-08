# Use a smaller base image for frontend build
FROM node:18-alpine AS frontend_builder

WORKDIR /frontend

# Copy package files
COPY ./frontend/package.json ./frontend/yarn.lock ./

# Install dependencies with memory optimization
RUN yarn install --frozen-lockfile --network-timeout 100000

# Copy source files
COPY ./frontend/ ./

# Build with memory optimization for Node.js
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN yarn build

# Use the Python backend image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10-slim

WORKDIR /

ENV MAX_WORKERS=1

# Install ffmpeg with optimizations for smaller builds
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./backend/requirements.txt /tmp/
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

# Copy backend code
COPY ./backend /app

# Copy built frontend
COPY --from=frontend_builder /frontend/dist /app/frontend/dist
