from sqlalchemy import Column, Integer, String
from app.core.db import Base

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)  # ✅ UNIQUE