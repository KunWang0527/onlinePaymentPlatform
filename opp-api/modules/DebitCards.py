from sqlalchemy import Column, Integer
from db.database import Base


class DebitCards(Base):
    __tablename__ = 'debitcards'

    id = Column(Integer, primary_key=True, index=True)
