from app.core.db import Base, engine
import app.models.user
import app.models.genre
import app.models.image
import app.models.submission
import app.models.contact

Base.metadata.create_all(bind=engine)

print("Tables created!")