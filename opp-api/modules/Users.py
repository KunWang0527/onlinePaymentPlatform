from sqlalchemy import Column, Integer, String, Boolean
from db.database import Base


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index = True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default= True)
    role = Column(String)


    # transactions = relationship('Transaction', back_populates='user')
    # credit_cards = relationship('CreditCards', back_populates='user')
    # debit_cards = relationship('DebitCards', back_populates='user')
