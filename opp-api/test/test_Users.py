import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base, SessionLocal
from modules.Users import Users
from sqlalchemy.orm.session import close_all_sessions
import bcrypt

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
def test_create_user(override_get_db):
    # Use the test database session
    db = override_get_db()

    # Create a test user
    user_data = {
        "first_name": "John",
        "last_name": "Doe",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "phone_number": "1234567890",
        "password_hash": "hashed_password",
        "is_active": True,
        "role": "user"
    }
    user = Users(**user_data)

    # Add the user to the database
    db.add(user)
    db.commit()

    # Retrieve the user from the database and assert its attributes
    retrieved_user = db.query(Users).filter_by(id=user.id).first()
    assert retrieved_user.first_name == user_data["first_name"]
    assert retrieved_user.first_name == "John"
    assert retrieved_user.last_name == user_data["last_name"]
    assert retrieved_user.username == user_data["username"]
    assert retrieved_user.email == user_data["email"]
    assert retrieved_user.phone_number == user_data["phone_number"]
    assert retrieved_user.password_hash == user_data["password_hash"]
    assert retrieved_user.is_active == user_data["is_active"]
    assert retrieved_user.role == user_data["role"]

    password = "test_password"
    wrong_password = "wrong_password"

    user.set_password(password)

    assert user.password_hash is not None
    assert bcrypt.checkpw(password.encode('utf-8'), user.password_hash)

    assert user.check_password(password)
    assert not user.check_password(wrong_password)

