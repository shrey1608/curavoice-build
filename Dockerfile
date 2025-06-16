FROM node:18.16 AS frontend_builder

WORKDIR /frontend

COPY ./frontend/package.json ./frontend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./frontend/ ./

# Limit Node's heap so it fits in Railway's builder
ENV NODE_OPTIONS="--max_old_space_size=384"
RUN yarn build --no-progress

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10-slim

WORKDIR /

ENV MAX_WORKERS=5
ARG DEBIAN_FRONTEND=noninteractive

# lightweight static ffmpeg (no apt needed)
RUN curl -sSL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
 | tar -xJ --strip-components=1 -C /usr/local/bin --wildcards '*/ffmpeg' \
 && chmod +x /usr/local/bin/ffmpeg

COPY ./backend/requirements.txt /tmp/

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./backend /app

COPY --from=frontend_builder /frontend/dist /app/frontend/dist
