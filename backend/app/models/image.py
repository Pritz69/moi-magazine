from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.db import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    genre_id = Column(Integer, ForeignKey("genres.id"), nullable=False)

    category = Column(String, nullable=False)  # ✅ REQUIRED

    # ✅ NEW FIELDS
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)