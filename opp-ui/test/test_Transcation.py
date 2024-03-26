import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base, SessionLocal
from modules.Transaction import Transaction, PaymentMethod
from sqlalchemy.orm.session import close_all_sessions
from modules.Users import Users
from datetime import datetime, timedelta
from unittest.mock import patch

# Create a test-specific database engine and session
TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
# Clear all tables in the database before running the test
Base.metadata.drop_all(bind=test_engine)
Base.metadata.create_all(bind=test_engine)

# Override the default dependency to use the test database session
@pytest.fixture
def override_get_db():
    TestingSessionLocal
    yield TestingSessionLocal
    close_all_sessions()

# Create tables in the test database
@pytest.fixture(autouse=True)
def create_test_tables():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)

def test_initiate_completed_transaction(override_get_db):
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


    # Create a test transaction
    transaction_data = {
        "user_id": 1,  # replace with the actual user id
        "amount": 200000.0,
        "payment_method": "Debit",
        "card_number":4147202464191053
    }

    for data in transaction_data:
        test_transaction = Transaction(**transaction_data)
        db.add(test_transaction)

    db.commit()
    with patch.object(Transaction, 'check_funds_and_fraud', return_value={"success": True, "msg": ""}):
        response = Transaction.initiateTransaction(db, **transaction_data)

    # Assert the response
    assert response.get("success") == True
    assert "Transaction initiated successfully." in response.get("msg", "")

    # Retrieve the transaction from the database and assert its attributes
    retrieved_transaction = db.query(Transaction).filter_by(id=1).first()
    assert retrieved_transaction.user_id == transaction_data["user_id"]
    assert retrieved_transaction.amount == transaction_data["amount"]
    assert retrieved_transaction.payment_method == transaction_data["payment_method"]

    # Retrieve pending transactions
    pending_transactions = Transaction.get_transactions_comprising_total_balance(db)

    # Assert the result
    assert isinstance(pending_transactions, list)

def test_get_pending_transactions(override_get_db):
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


    # Create a test transaction
    transaction_data = {
        "user_id": 1,  # replace with the actual user id
        "amount": 200000.0,
        "payment_method": "Credit",
        "card_number":4147202464191053
    }

    for data in transaction_data:
        test_transaction = Transaction(**transaction_data)
        db.add(test_transaction)

    db.commit()
    with patch.object(Transaction, 'check_funds_and_fraud', return_value={"success": True, "msg": ""}):
        response = Transaction.initiateTransaction(db, **transaction_data)
    # Retrieve pending transactions
    pending_transactions = Transaction.get_pending_transactions(db)

    # Assert the result
    assert isinstance(pending_transactions, list)


def test_update_credit_card_transactions(override_get_db):
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


    # Create a test transaction
    transaction_data = {
        "user_id": 8,
        "amount": 200000.0,
        "payment_method": "Credit",
        "card_number":4147202464191057,
        "transaction_date":datetime.utcnow() - timedelta(days=5),
        "status":"pending"
    }

    test_transaction = Transaction(**transaction_data)
    db.add(test_transaction)
    

    db.commit()
    Transaction.update_credit_card_transactions(db)

    # Retrieve updated transactions
    updated_transactions = db.query(Transaction).filter_by(user_id = 8).all()
    assert isinstance(updated_transactions, list)
    # for transaction in updated_transactions:
    #     assert transaction.status == "completed"

