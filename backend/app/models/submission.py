from sqlalchemy import Column, Integer, String
from app.core.db import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True)

    name = Column(String)
    email = Column(String)
    phone = Column(String)
    age = Column(String)
    location = Column(String)
    instagram = Column(String)

    image1 = Column(String)
    image2 = Column(String)
    image3 = Column(String)