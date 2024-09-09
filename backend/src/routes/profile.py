import logging

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from routes.schemas.profile import Profile

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s:%(name)s - %(message)s")
logger = logging.getLogger(__name__)


profile_router = APIRouter(tags=["profile"])

profiles = {
    "1": {
        "id": "1",
        "first_name": "Keisuke",
        "last_name": "Inagaki",
        "email": "aaa",
        "age": 29,
    },
    "2": {
        "id": "2",
        "first_name": "Mike",
        "last_name": "Smith",
        "email": "bbb",
        "age": 30,
    },
    "3": {
        "id": "3",
        "first_name": "Emily",
        "last_name": "Jones",
        "email": "ccc",
        "age": 25,
    },
}


@profile_router.get("/health")
def health():
    """For health check"""
    return {"status": "ok"}


@profile_router.get("/profile/{id}", response_model=Profile)
def get_profile(id: str):
    return profiles[id]


@profile_router.post("/profile", response_model=Profile)
def post_profile(profile: Profile):
    profile_encoded = jsonable_encoder(profile)
    id = str(len(profiles) + 1)
    profiles[id] = profile_encoded
    logger.debug(f"Created profile: {profiles[id]}")
    return profiles[id]


@profile_router.put("/profile/{id}")
def put_profile(id: str, profile: Profile):
    update_profile_encoded = jsonable_encoder(profile)
    profiles[id] = update_profile_encoded
    logger.debug(f"Updated profile: {profiles[id]}")
    return profiles[id]


# 全体の中で一部のみを変更したい場合はpatchが最も効率的。
# ただし、patch_profile の引数の profile は Profile 型であり、必須のフィールドは必ずFEから送る必要がある。
# そのため、もし Profileが必須フィールドしか持たない場合はputと変わらない。
@profile_router.patch("/profile/{id}")
def patch_profile(id: str, profile: Profile):
    stored_profile_model = Profile(**profiles[id])
    # exclude_unset=Trueで、デフォルト値を含まないdictを生成
    # つまり、リクエストで送られた一部のkey-valueのみを含むdictを生成
    update_data = profile.model_dump(exclude_unset=True)
    # model_copy()とupdateの組み合わせで、dictの一部だけを更新
    updated_profile = stored_profile_model.model_copy(update=update_data)
    profiles[id] = jsonable_encoder(updated_profile)
    logger.debug(f"Patched profile: {profiles[id]}")
    return profiles[id]
