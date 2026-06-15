from fastapi import FastAPI

app = FastAPI(title="AI Gateway", version="1.0")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
async def root():
    return {"message": "AI Gateway is up and running"}