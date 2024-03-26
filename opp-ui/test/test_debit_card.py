import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base, engine, SessionLocal
from modules.DebitCards import DebitCards
from sqlalchemy.orm.session import close_all_sessions
from sqlalchemy.orm import relationship

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

