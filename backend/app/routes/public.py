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


from app.models.user import User
from app.models.genre import Genre
from app.models.image import Image
from app.models.submission import Submission
from app.models.contact import Contact


def serialize(model_instance):
    return {
        column.name: getattr(model_instance, column.name)
        for column in model_instance.__table__.columns
    }


@router.get("/export-db")
def export_database(db: Session = Depends(get_db)):
    try:
        data = {}

        data["users"] = [serialize(u) for u in db.query(User).all()]
        data["genres"] = [serialize(g) for g in db.query(Genre).all()]
        data["images"] = [serialize(i) for i in db.query(Image).all()]
        data["submissions"] = [serialize(s) for s in db.query(Submission).all()]
        data["contacts"] = [serialize(c) for c in db.query(Contact).all()]

        return data

    except Exception as e:
        return {"error": str(e)}
