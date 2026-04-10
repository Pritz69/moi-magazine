from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.models.genre import Genre
from app.models.image import Image
from app.core.deps import admin_only
import app.core.cloudinary
import cloudinary.uploader

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/genre")
def create_genre(
    name: str = Form(...),
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    name = name.strip().lower()

    existing = db.query(Genre).filter(Genre.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Genre already exists")

    genre = Genre(name=name)
    db.add(genre)
    db.commit()

    return {"msg": "Genre added successfully"}


@router.get("/genre")
def get_genres(db: Session = Depends(get_db)):
    return db.query(Genre).all()


@router.post("/image")
def upload_image(
    genre_id: int = Form(...),
    category: str = Form(...),
    title: str = Form(""),
    description: str = Form(""),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    category = category.strip().lower()

    if category not in ["nominations", "winners", "bestworks"]:
        raise HTTPException(status_code=400, detail="Invalid category")

    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")

    result = cloudinary.uploader.upload(file.file)

    image = Image(
        url=result["secure_url"],
        genre_id=genre_id,
        category=category,
        title=title,
        description=description
    )

    db.add(image)
    db.commit()

    return {"msg": "Image uploaded successfully"}


from app.models.contact import Contact

@router.get("/contacts")
def get_contacts(
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    return db.query(Contact).all()