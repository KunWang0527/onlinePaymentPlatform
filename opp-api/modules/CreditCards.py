from sqlalchemy import Column, Integer
from db.database import Base


class CreditCards(Base):
    __tablename__ = 'creditcards'

    id = Column(Integer, primary_key=True, index=True)
