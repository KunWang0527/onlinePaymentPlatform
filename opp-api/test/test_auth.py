from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base
from modules.Users import Users
from routers.auth import get_db, authenticate_user, create_access_token, get_current_user
import pytest
from sqlalchemy.orm.session import close_all_sessions
from datetime import datetime, timedelta
from main import app
from dotenv import load_dotenv
import uuid
from jose import jwt, JWTError


import os

# Configure SQLite engine
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session factory
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

load_dotenv()  # take environment variables from .env.

# These are used to create the signature for a JWT
SECRET_KEY = ""  # os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
# Create tables in the test database
Base.metadata.create_all(bind=engine)

# Clear all tables in the database before running the test
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# Override the default dependency to use the test database session
@pytest.fixture
def override_get_db():
    TestingSessionLocal
    yield TestingSessionLocal
    close_all_sessions()

# Test function
def test_create_user(override_get_db):
    # Arrange
    db = override_get_db()
    client = TestClient(app)

    ############################# CREATE USER ######################################
    # Create a test user
    user_data = {
        "first_name": "John",
        "last_name": "Doe",
        "username": f"johndoe_{uuid.uuid4()}",
        "email": f"john.doe.{uuid.uuid4()}@example.com",
        "phone_number": "1234567890",
        "password": "Luyuchen123",
        "is_active": True,
        "role": "user"
    }

    # Act
    response = client.post("/auth/", json=user_data)

    ############################# LOGIN WITH PASSWORD ######################################

    # Assert
    assert response.status_code == 201
    assert response.json()[0] == {"message": "User created successfully."}

    login_data = {"username": user_data["username"], "password": "Luyuchen123"}
    response = client.post("/auth/token/", data=login_data)

    # Check that the response has a 200 status code
    assert response.status_code == 200

    # Check that the response has the expected structure
    assert "access_token" in response.json()
    assert "token_type" in response.json()

    # Decode the JWT token to ensure it's valid
    token = response.json()["access_token"]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert payload["sub"] == user_data["username"]
        assert payload["role"] == "user"
    except JWTError:
        # If decoding fails, the test should fail
        assert False, "JWT decoding failed"
    


    ############################# CHANGE PASSWORD ######################################
    # Act
    new_password = "Luyuchen122"
    headers = {"Authorization": f"Bearer {token}"}
    change_password_data = {"old_password": "Luyuchen123", "new_password": new_password}
    response = client.post("/auth/change-password/?old_password=Luyuchen123&new_password=" + new_password, data=change_password_data, headers=headers)

    # Print response content
    print(response.content)
    # Assert
    assert response.status_code == 200

    assert response.json()["message"] == "Password updated successfully."

    # Verify that the password has been updated
    login_data["password"] = new_password
    login_response = client.post("/auth/token/", data=login_data)
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()

    ############################# deactivate-my-account ######################################
    # Act
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/auth/deactivate-my-account/", headers=headers)

    # Assert
    assert response.status_code == 200
    assert response.json()["message"] == "User account has been deactivated."


