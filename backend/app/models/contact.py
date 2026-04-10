from sqlalchemy import Column, Integer, String
from app.core.db import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    instagram = Column(String)
    message = Column(String)