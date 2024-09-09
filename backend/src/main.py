import logging
import traceback
from typing import Callable

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from repositories.common import (
    RecordAccessNotAllowedError,
    RecordNotFoundError,
    ResourceConflictError,
)
from routes.profile import profile_router
from starlette.requests import Request
from starlette.responses import Response

logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(
    openapi_tags=[
        {"name": "profile", "description": "Profile API"},
    ],
    titile="My API",
)

app.include_router(profile_router)


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


# NOTE: 以下のエラーハンドリングのコードはBedrock Chatのコードをパクってきている
def error_handler_factory(status_code: int) -> Callable[[Request, Exception], Response]:
    def error_handler(_: Request, exc: Exception) -> JSONResponse:
        logger.error(exc)
        logger.error("".join(traceback.format_tb(exc.__traceback__)))
        return JSONResponse({"errors": [str(exc)]}, status_code=status_code)

    return error_handler  # type: ignore


app.add_exception_handler(RecordNotFoundError, error_handler_factory(404))
app.add_exception_handler(FileNotFoundError, error_handler_factory(404))
app.add_exception_handler(RecordAccessNotAllowedError, error_handler_factory(403))
app.add_exception_handler(ValueError, error_handler_factory(400))
app.add_exception_handler(TypeError, error_handler_factory(400))
app.add_exception_handler(AssertionError, error_handler_factory(400))
app.add_exception_handler(PermissionError, error_handler_factory(403))
app.add_exception_handler(ValidationError, error_handler_factory(422))
app.add_exception_handler(ResourceConflictError, error_handler_factory(409))
app.add_exception_handler(Exception, error_handler_factory(500))
