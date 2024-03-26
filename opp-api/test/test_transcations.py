import json
from fastapi.testclient import TestClient
from routers.transactions import router

client = TestClient(router)

def test_get_transaction():
    response = client.get("/transaction/")
    assert response.status_code == 401  # Assuming that a 401 status code is expected for unauthorized access
    # You can add more assertions based on your expected behavior

def test_initiate_transaction():
    # Assuming you need to provide some data in the request body
    data = {
        "card_number": "1234",
        "amount": 100.0,
        "payment_method": "some_payment_method"
    }
    response = client.post("/transaction/initiate", json=data)
    assert response.status_code == 401  # Assuming that a 401 status code is expected for unauthorized access
    # You can add more assertions based on your expected behavior

def test_update_credit_transactions():
    response = client.post("/transaction/update_credit_transactions")
    assert response.status_code == 401  # Assuming that a 401 status code is expected for unauthorized access
    # You can add more assertions based on your expected behavior

def test_read_all():
    response = client.get("/transaction/")
    assert response.status_code == 401  # Assuming that a 401 status code is expected for unauthorized access
    # You can add more assertions based on your expected behavior