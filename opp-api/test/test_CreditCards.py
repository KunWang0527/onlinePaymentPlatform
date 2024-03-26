import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base, SessionLocal
from modules.CreditCards import CreditCards
from sqlalchemy.orm.session import close_all_sessions

# Create a test-specific database engine and session
TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Override the default dependency to use the test database session
@pytest.fixture
def override_get_db():
    yield TestingSessionLocal
    close_all_sessions()

# Create tables in the test database
@pytest.fixture(autouse=True)
def create_test_tables():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)

# Test cases
def test_create_credit_card(override_get_db):
    # Use the test database session
    db = override_get_db()

    # Create a test credit card
    credit_card_data = {"id": 1}
    credit_card = CreditCards(**credit_card_data)

    # Add the credit card to the database
    db.add(credit_card)
    db.commit()

    # Retrieve the credit card from the database and assert its attributes
    retrieved_credit_card = db.query(CreditCards).filter_by(id=1).first()
    assert retrieved_credit_card.id == credit_card_data["id"]
