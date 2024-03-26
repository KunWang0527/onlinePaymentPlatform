from datetime import datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from modules.Transaction import Transaction
from routers.auth import get_current_user
from db.database import SessionLocal

# load_dotenv()  # take environment variables from .env.

router = APIRouter(prefix='/transaction', tags=['transaction'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

# when an API uses this, it will enforce authorization
user_dependency = Annotated[dict, (Depends(get_current_user))]


class Token(BaseModel):
    access_token: str
    token_type: str


@router.get("/get_completed", status_code=status.HTTP_200_OK)
async def get_completed_transaction(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    return Transaction.get_transactions_comprising_total_balance(db, user.id)


@router.get("/get_pending", status_code=status.HTTP_200_OK)
async def get_pending(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    return Transaction.get_pending_transactions(db, user.id)


@router.get("/total_balance_time_period")
async def get_total_balance_time_period(user: user_dependency, db: db_dependency, start_date: str, end_date: str):
    check_user_auth(user)
    date_format = "%Y-%m-%d"
    if not validate_date(start_date, date_format) or not validate_date(end_date, date_format):
        raise HTTPException(status_code=422, detail="Invalid Date")

    start_date = datetime.strptime(start_date, date_format)
    end_date = datetime.strptime(end_date, date_format)
    start_datetime = datetime.combine(start_date, datetime.min.time())
    end_datetime = datetime.combine(end_date, datetime.max.time())

    try:
        total_balance = Transaction.calculate_total_balance_for_period(db, start_datetime, end_datetime, user.id)
        #return {"total balance in this time period": total_balance}
        return total_balance
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/initiate")
async def initiate_transaction(user: user_dependency, db: db_dependency, card_number: str, amount: float,
                               payment_method):
    # user = db.query(Users).filter_by(email=transferTo, role='businessowner').all()
    # if not user:
    #     raise HTTPException(status_code=401, detail='Email Not Found')
    check_user_auth(user)
    try:
        float(amount)
    except:
        raise HTTPException(422,"Invalid amount")
    if float(amount)<=0:
        raise HTTPException(422, "Invalid amount")
    return Transaction.initiateTransaction(db, user.id, card_number, float(amount), payment_method)


# @router.post("/initiate")
# async def initiate_transaction(user: user_dependency, db: db_dependency, card_number: str, amount: float, payment_method):
#     check_user_auth(user)
#     return Transaction.initiateTransaction(db, user.id, card_number, amount, payment_method)

@router.post("/update_credit_transactions")
async def update_credit_transactions(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    Transaction.update_credit_card_transactions(db, user.id)
    return {"message": "Credit card transactions updated"}


@router.get("/", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    # if user is None or user.role.lower() != 'admin':
    #     raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Transaction).filter_by(user_id=user.id).all()


def validate_date(date, date_format):
    try:
        datetime.strptime(date, date_format)
        return True
    except ValueError:
        return False


# Check whether user has right to access specific transactions
def check_user_auth(user):
    if user is None or user.role.lower() != 'businessowner':
        raise HTTPException(status_code=401, detail='Authentication Failed')
