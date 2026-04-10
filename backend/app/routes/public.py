from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.models.genre import Genre
from app.models.image import Image

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/genres")
def get_genres(db: Session = Depends(get_db)):
    return db.query(Genre).all()


# ✅ ALL NOMINATIONS GROUPED
@router.get("/images/nominations")
def get_nominations(db: Session = Depends(get_db)):
    genres = db.query(Genre).all()
    result = []

    for g in genres:
        imgs = db.query(Image).filter(
            Image.genre_id == g.id,
            Image.category == "nominations"
        ).all()

        if imgs:
            result.append({
                "genre": g.name,
                "images": imgs
            })

    return result


# ✅ ALL WINNERS GROUPED
@router.get("/images/winners")
def get_winners(db: Session = Depends(get_db)):
    genres = db.query(Genre).all()
    result = []

    for g in genres:
        imgs = db.query(Image).filter(
            Image.genre_id == g.id,
            Image.category == "winners"
        ).all()

        if imgs:
            result.append({
                "genre": g.name,
                "images": imgs
            })

    return result


@router.get("/images/bestworks")
def get_bestworks(db: Session = Depends(get_db)):
    return db.query(Image).filter(
        Image.category == "bestworks"
    ).all()