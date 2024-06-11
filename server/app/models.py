from sqlalchemy import Column
from sqlalchemy import Enum as SQLEnum
from sqlalchemy import Integer, String

from app.database import Base
from app.schemas import UserType, PatientGender


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    type = Column(SQLEnum(UserType))

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    email = Column(String, unique=True, index=True)
    mobile_number = Column(String, unique=True, index=True)
    gender = Column(SQLEnum(PatientGender))