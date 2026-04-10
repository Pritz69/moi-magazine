from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response, Form
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.models.user import User
from app.models.submission import Submission
from app.core.hash import hash_password, verify_password
from app.core.security import create_access_token
from app.core.deps import get_current_user
import cloudinary.uploader

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(
    email: str = Form(None),
    phone: str = Form(None),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    if not email and not phone:
        raise HTTPException(status_code=400, detail="Email or phone required")

    # ✅ Separate checks
    if email:
        existing = db.query(User).filter(User.email == email).first()
    else:
        existing = db.query(User).filter(User.phone == phone).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=email,
        phone=phone,
        password=hash_password(password)
    )

    db.add(user)
    db.commit()

    return {"msg": "User created successfully"}


@router.post("/login")
def login(
    email: str = Form(None),
    phone: str = Form(None),
    password: str = Form(...),
    response: Response = None,
    db: Session = Depends(get_db)
):
    user = None

    # ✅ STRICT CHECK (no OR confusion)
    if email:
        user = db.query(User).filter(User.email == email).first()
    elif phone:
        user = db.query(User).filter(User.phone == phone).first()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Wrong password")

    token = create_access_token({
        "sub": user.email or user.phone,
        "role": user.role
    })

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="none",
        secure=True,
        path="/"   # ✅ ADD THIS
    )

    return {"msg": "Login successful"}

from typing import Optional
from fastapi import Form, File, UploadFile, HTTPException, Depends

@router.post("/submit")
def submit_model(
    name: str = Form(...),

    email: Optional[str] = Form(None),
    phone: Optional[str] = Form(None),

    age: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),

    file1: Optional[UploadFile] = File(None),
    file2: Optional[UploadFile] = File(None),
    file3: Optional[UploadFile] = File(None),

    db: Session = Depends(get_db)
):
    try:
        # ✅ VALIDATION: require at least email OR phone
        if not email and not phone:
            raise HTTPException(
                status_code=400,
                detail="Either email or phone is required"
            )

        # ✅ Upload only if file exists
        img1 = cloudinary.uploader.upload(file1.file)["secure_url"] if file1 else None
        img2 = cloudinary.uploader.upload(file2.file)["secure_url"] if file2 else None
        img3 = cloudinary.uploader.upload(file3.file)["secure_url"] if file3 else None

        submission = Submission(
            name=name,
            email=email,
            phone=phone,
            age=age,
            location=location,
            instagram=instagram,
            image1=img1,
            image2=img2,
            image3=img3
        )

        db.add(submission)
        db.commit()

        return {"msg": "Submitted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ GET CURRENT USER
@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return {
        "email": user.email,
        "phone": user.phone,
        "name": user.name,
        "instagram": user.instagram,
        "gender": user.gender,
        "bio": user.bio,
        "role": user.role
    }


@router.post("/update-profile")
def update_profile(
    data: dict,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # ✅ fetch user again using SAME db session
    user = db.query(User).filter(User.id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.name = data.get("name")
    user.instagram = data.get("instagram")
    user.gender = data.get("gender")
    user.bio = data.get("bio")

    db.commit()

    return {
        "msg": "Profile updated",
        "user": {
            "name": user.name,
            "instagram": user.instagram,
            "gender": user.gender,
            "bio": user.bio
        }
    }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="token",
        path="/",
    )
    return {"message": "Logged out successfully"}
