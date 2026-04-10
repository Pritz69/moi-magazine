from sqlalchemy import Column, Integer, String
from app.core.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=True)
    phone = Column(String, unique=True, nullable=True)
    password = Column(String)

    name = Column(String, nullable=True)
    instagram = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    bio = Column(String, nullable=True)

    role = Column(String, default="user")