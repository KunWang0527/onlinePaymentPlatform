# ReST API

## 1. Transaction Service:

### Endpoint: /transactions

#### POST (process a customer’s credit card/debit card charges for a purchase)
    Input: {userID, cardNumber, amount, cardType (credit/debit), otherCardDetails}
    
    Output: {transactionID, status}
    
    Errors:
        - 403 Forbidden: Card not valid.
        - 400 Bad Request: Insufficient funds (for debit cards).
        - 400 Bad Request: Fraudulent payment detected.
#### GET (get a list of all transactions)
    Input: {userID}
    
    Output: [list of transactions]
    
#### GET (get a list of all accounts receivables or pending purchases)
    Input: {userID, status: "in-processing"}
    
    Output: [list of in-processing transactions]
    
## 2. Reporting Service:

### Endpoint: /reports

#### GET (calculate the current total balance of fully processed funds)
    Input: {userID}
    
    Output: {totalBalance}
    
#### GET (calculate the current total balance of fully processed funds for a certain time period)
    Input: {userID, startDate, endDate}
    
    Output: {totalBalance}
    
## 3. User Management Service:

### Endpoint: /users

#### POST (signup for an account with the platform)
    Input: {username, password, otherProfileData}
    
    Output: {userID, status}
    
    Errors:
        - 409 Conflict: Username already exists.
        
#### GET (user authentication)
    Input: {username, password}
    
    Output: {userID, authenticationToken}
    
    Errors:
        - 401 Unauthorized: Wrong username or password.
        
## 4. Payment Verification Service:

### Endpoint: /payment-verification

#### POST (validate credit/debit cards using Lund Algorithm)
    Input: {cardNumber, cardType}
    
    Output: {validationStatus}
    
    Errors:
        - 403 Forbidden: Card not valid.

