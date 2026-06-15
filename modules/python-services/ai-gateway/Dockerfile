FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml ./
COPY app ./app

RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir fastapi uvicorn \
 && pip install --no-cache-dir .

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
 CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=2)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]