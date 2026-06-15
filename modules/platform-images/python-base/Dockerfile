FROM python:3.12.7-slim-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv

RUN /opt/venv/bin/pip install --no-cache-dir --upgrade pip setuptools wheel