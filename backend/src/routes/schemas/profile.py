from routes.base import BaseSchema


class Profile(BaseSchema):
    id: int
    first_name: str
    last_name: str = None
    email: str = None
    age: int = None
