FROM node:18.16 AS frontend_builder

WORKDIR /frontend

COPY ./frontend/package.json ./frontend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./frontend/ ./

# Limit Node's heap so it fits in Railway's builder
ENV NODE_OPTIONS="--max_old_space_size=512"
RUN yarn build

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10-slim

WORKDIR /

ENV MAX_WORKERS=5

# Keep ffmpeg install lean
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/*

COPY ./backend/requirements.txt /tmp/

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./backend /app

COPY --from=frontend_builder /frontend/dist /app/frontend/dist
