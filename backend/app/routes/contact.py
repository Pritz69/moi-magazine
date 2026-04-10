from fastapi import APIRouter, Form, Depends
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.models.contact import Contact

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/contact")
def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    instagram: str = Form(...),
    message: str = Form(...),
    db: Session = Depends(get_db)
):
    contact = Contact(
        name=name,
        email=email,
        phone=phone,
        instagram=instagram,
        message=message
    )

    db.add(contact)
    db.commit()

    return {"msg": "Submitted successfully"}