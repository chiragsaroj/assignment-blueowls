from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from app import auth, models, schemas, security
from app.database import get_db

router = APIRouter()

@router.get("/patient-appointment", response_model=schemas.PatientAppointmentResponse)
async def get_patient_appointments(email: str, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).options(joinedload(models.Patient.appointments)).filter(models.Patient.email == email).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/patient-appointment/{patient_id}", response_model=schemas.PatientAppointmentResponse)
async def get_patient_appointments(patient_id: int, db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(auth.get_current_user)):
    if not current_user: 
        raise HTTPException(status_code=401, detail="Unauthorized")

    patient = db.query(models.Patient).options(joinedload(models.Patient.appointments)).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.get("/appointments", response_model=List[schemas.AppointmentResponse])
async def list_appointments(db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(auth.get_current_user)):
    if not current_user: 
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    appointments = db.query(models.Appointment).join(models.Patient).all()
    return appointments

@router.post("/appointments", response_model=schemas.AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_patient = db.query(models.Patient).filter(models.Patient.id == appointment.patient_id).first()
    if not db_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db_appointment = models.Appointment(
        appointment_date=appointment.appointment_date,
        payment_status="pending",
        note=appointment.note,
        amount=appointment.amount,
        patient_id=appointment.patient_id
    )
    
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)

    payment_link = security.generate_payment_link(appointment.amount, db_appointment.id)
    db_appointment.payment_link = payment_link.url
    
    db.commit()
    db.refresh(db_appointment)
    
    return db_appointment


@router.get("/patients", response_model=List[schemas.PatientResponse])
async def list_patients(name: Optional[str] = Query(None), db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(auth.get_current_user)):
    if not current_user: 
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    if name:
        patients = db.query(models.Patient).filter(models.Patient.name.ilike(f"%{name}%")).all()
    else: 
        patients = db.query(models.Patient).all()
    return patients

@router.get("/patients/{patient_id}", response_model=schemas.PatientResponse)
async def read_patient(patient_id: int, db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(auth.get_current_user)):
    if not current_user: 
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("/patient", response_model=schemas.PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = db.query(models.Patient).filter(models.Patient.email == patient.email).first()
    if db_patient:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_patient = db.query(models.Patient).filter(models.Patient.mobile_number == patient.mobile_number).first()
    if db_patient:
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    db_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        email=patient.email,
        mobile_number=patient.mobile_number,
        gender=patient.gender
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


@router.put("/patients/{patient_id}", response_model=schemas.PatientResponse)
async def update_patient(patient_id: int, patient_update: schemas.PatientUpdate, db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(auth.get_current_user)):
    if not current_user: 
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Check for email conflicts
    if patient_update.email and patient_update.email != patient.email:
        email_conflict = db.query(models.Patient).filter(models.Patient.email == patient_update.email).first()
        if email_conflict:
            raise HTTPException(status_code=400, detail="Email already registered")

    # Check for mobile number conflicts
    if patient_update.mobile_number and patient_update.mobile_number != patient.mobile_number:
        mobile_conflict = db.query(models.Patient).filter(models.Patient.mobile_number == patient_update.mobile_number).first()
        if mobile_conflict:
            raise HTTPException(status_code=400, detail="Mobile number already registered")

    for key, value in patient_update.dict(exclude_unset=True).items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient


@router.delete("/patients/{patient_id}", response_model=schemas.PatientResponse)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()
    return patient


@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = auth.get_user(db, username=form_data.username)
    if not user or not security.pwd_context.verify(
        form_data.password, user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(hours=security.ACCESS_TOKEN_EXPIRE_HOURS)
    access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register/", response_model=schemas.UserInDBBase)
async def register(user_in: schemas.UserIn, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, username=user_in.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = security.get_password_hash(user_in.password)
    db_user = models.User(**user_in.dict(exclude={"password"}), hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# @router.get("/conversation/")
# async def read_conversation(
#     current_user: schemas.UserInDB = Depends(auth.get_current_user),
# ):
#     return {
#         "conversation": "This is a secure conversation!",
#         "current_user": current_user.username,
#     }