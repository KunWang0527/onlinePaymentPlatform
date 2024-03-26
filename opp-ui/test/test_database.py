import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from db.database import SessionLocal, Base, engine

# Define the test database engine
TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Override the default dependency to use the test database session
@pytest.fixture
def override_get_db():
    yield TestingSessionLocal

# Create tables in the test database
@pytest.fixture(autouse=True)
def create_test_tables():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)

# Test cases
def test_session_local_creation(override_get_db):
    # Use the test database session
    db = override_get_db()

    # Ensure the SessionLocal is created and working
    assert db is not None
    assert db.execute("SELECT 1").scalar() == 1

def test_create_engine():
    # Ensure the engine is created
    assert test_engine is not None

def test_base_declaration():
    # Ensure the Base is declared
    assert Base is not None
