from sqlalchemy import Column
from sqlalchemy import Enum as SQLEnum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base
from app.schemas import UserType, PatientGender, PaymentStatus


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

    appointments = relationship("Appointment", back_populates="patient")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    appointment_date = Column(DateTime, default=datetime.utcnow)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.pending)
    note = Column(String)
    payment_link = Column(String, nullable=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    amount = Column(Float)

    patient = relationship("Patient", back_populates="appointments")