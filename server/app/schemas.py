from pydantic import BaseModel
from typing import Optional
from enum import Enum


class UserType(str, Enum):
    patient = "patient"
    super_admin = "super_admin"

class UserBase(BaseModel):
    email: str
    username: str
    type: UserType = UserType.patient


class UserIn(UserBase):
    password: str


class UserInDBBase(UserBase):
    id: int

    class Config:
        from_attributes = True


class UserInDB(UserInDBBase):
    hashed_password: str


class TokenData(BaseModel):
    username: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str

class PatientGender(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class PatientCreate(BaseModel):
    name: str
    age: int
    email: str
    mobile_number: str
    gender: PatientGender

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    email: Optional[str] = None
    mobile_number: Optional[str] = None
    gender: Optional[PatientGender] = None

class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    email: str
    mobile_number: str
    gender: PatientGender

    class Config:
        from_attributes = True