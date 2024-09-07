from urllib import response

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    # "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    """For health check"""
    return {"status": "ok"}


@app.get("/profile", response_model=dict)
def root():
    return {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "aaa",
        "age": 30,
    }
