# Production Dockerfile for Railway - No frontend build required
FROM python:3.10-slim

WORKDIR /app

# Set environment variables for Railway
ENV MAX_WORKERS=1
ENV WEB_CONCURRENCY=1
ENV PORT=8000

# Install system dependencies if needed (commented out to save memory)
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends ffmpeg && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY ./backend .

# Copy pre-built frontend (you'll build this locally)
COPY ./frontend/dist ./frontend/dist

# Expose port for Railway
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 