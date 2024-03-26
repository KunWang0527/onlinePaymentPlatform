import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base, engine, SessionLocal
from modules.DebitCards import DebitCards
from sqlalchemy.orm.session import close_all_sessions


# Create a test-specific database engine and session
TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


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
def test_create_debit_card(override_get_db):
    # Use the test database session
    db = override_get_db()

    # Create a test debit card
    debit_card_data = {"id": 1}
    debit_card = DebitCards(**debit_card_data)

    # Add the debit card to the database
    db.add(debit_card)
    db.commit()

    # Retrieve the debit card from the database and assert its attributes
    retrieved_debit_card = db.query(DebitCards).filter_by(id=1).first()
    assert retrieved_debit_card.id == debit_card_data["id"]

