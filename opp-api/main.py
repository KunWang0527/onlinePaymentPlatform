from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules import Users, Transaction, DebitCards, CreditCards
from db.database import engine
from routers import auth, developer, businessOwner, transactions

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://18.216.139.10:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up database
Users.Base.metadata.create_all(bind=engine)
CreditCards.Base.metadata.create_all(bind=engine)
DebitCards.Base.metadata.create_all(bind=engine)
Transaction.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(developer.router)
app.include_router(businessOwner.router)
app.include_router(transactions.router)
