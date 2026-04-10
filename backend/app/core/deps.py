from fastapi import Depends, HTTPException, Request
from jose import jwt
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.db import SessionLocal

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):
    token = request.cookies.get("token")

    if not token:
        raise HTTPException(status_code=401, detail="No token")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    identifier = payload.get("sub")

    user = db.query(User).filter(
        (User.email == identifier) | (User.phone == identifier)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def admin_only(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return user