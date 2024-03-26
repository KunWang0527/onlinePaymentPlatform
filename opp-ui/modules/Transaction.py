from datetime import datetime, timedelta
from enum import Enum
from fastapi import HTTPException

import requests
from sqlalchemy import (
    Column, Integer, Float, String, DateTime, ForeignKey
)

from db.database import Base


class TransactionStatus(Enum):
    completed = "completed"
    in_processing = "pending"


class PaymentMethod(Enum):
    debit = "debit"
    credit = "credit"


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    transaction_date = Column(DateTime, default=datetime.utcnow)
    # status = Column(Enum('pending', 'completed'), default='completed')
    status = Column(String, default='completed')
    # payment_method = Column(Enum(PaymentMethod))
    payment_method = Column(String)

    # user = relationship('User', back_populates='transactions')

    @classmethod
    def get_pending_transactions(cls, session, userId):
        # Update credit card transactions status before fetching pending transactions
        cls.update_credit_card_transactions(session, userId)
        return session.query(cls).filter_by(user_id=userId, status='pending').all()

    @classmethod
    def get_transactions_comprising_total_balance(cls, session, userId):
        # This method assumes that only 'completed' transactions contribute to the total balance.
        cls.update_credit_card_transactions(session, userId)
        return session.query(cls).filter_by(user_id=userId, status='completed').all()

    @classmethod
    def calculate_total_balance_for_period(cls, session, start_date: datetime, end_date: datetime, userId):
        if start_date > end_date:
            raise ValueError("Start date must be before end date")

        transactions = session.query(cls).filter(
            cls.user_id == userId,
            cls.status == 'completed',
            cls.transaction_date >= start_date,
            cls.transaction_date <= end_date
        ).all()

        total_balance = sum(transaction.amount for transaction in transactions)

        return total_balance

    @classmethod
    def validate_card(cls, card_number):
        url = "https://c3jkkrjnzlvl5lxof74vldwug40pxsqo.lambda-url.us-west-2.on.aws"
        payload = {"card_number": card_number}
        headers = {'content-type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers,timeout=10)
        if response.status_code == 200:
            return response.json()
        return {"error": f"Request failed with status code {response.status_code}"}

    @classmethod
    def check_funds_and_fraud(cls, card_number, amount):
        url = "https://223didiouo3hh4krxhm4n4gv7y0pfzxk.lambda-url.us-west-2.on.aws"
        payload = {"card_number": card_number, "amt": amount}
        headers = {'content-type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers,timeout=10)

        if response.status_code == 200:
            return response.json()
        return {"error": f"Request failed with status code {response.status_code}"}

    @classmethod
    def initiateTransaction(cls, session, user_id, card_number, amount, payment_method):
        # Validate the card
        card_validation = cls.validate_card(card_number)
        if card_validation.get("success") == "false":
            raise HTTPException(status_code=502, detail='Invalid Card Number')
            # return {"error": card_validation.get("msg")}

        # Check funds and potential fraud
        funds_check = cls.check_funds_and_fraud(card_number, amount)
        # print(funds_check)
        if funds_check.get("success") == 'false':
            raise HTTPException(status_code=502, detail='Insufficient funds and/or fraudulent card')
            #return {"error": funds_check.get("msg")}

        # initial_status = "completed" if payment_method == PaymentMethod.debit else "pending"
        initial_status = "completed" if payment_method == "debit" else "pending"

        # All checks passed, create the transaction
        new_transaction = cls(
            user_id=user_id,
            amount=amount,
            transaction_date=datetime.utcnow(),
            status=initial_status,
            payment_method=payment_method
        )
        session.add(new_transaction)
        session.commit()

        return {"success": True, "msg": "Transaction initiated successfully."}

    @classmethod
    def update_credit_card_transactions(cls, session, userId):
        two_days_ago = datetime.utcnow() - timedelta(days=2)
        transactions_to_update = session.query(cls).filter(
            cls.user_id == userId,
            cls.payment_method == "credit",  # PaymentMethod.credit,
            cls.status == "pending",
            cls.transaction_date <= two_days_ago#datetime.utcnow()  # two_days_ago
        ).all()

        for transaction in transactions_to_update:
            transaction.status = "completed"

        session.commit()

# t = Transaction()
# print(t.check_funds_and_fraud("4147202464191053", 200000))
