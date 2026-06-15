FROM company/python-base:1.0

WORKDIR /app

COPY pyproject.toml ./
COPY app ./app

RUN /opt/venv/bin/pip install .

CMD ["python", "-m", "app.workers.kafka_consumer"]