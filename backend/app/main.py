from fastapi import FastAPI
from app.routes import auth
from app.routes import admin
from app.routes import public
from dotenv import load_dotenv
from app.routes import contact
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/auth")
app.include_router(admin.router, prefix="/admin")
app.include_router(public.router)
app.include_router(contact.router)
@app.get("/")
def root():
    return {"message": "MOI Magazine API running"}