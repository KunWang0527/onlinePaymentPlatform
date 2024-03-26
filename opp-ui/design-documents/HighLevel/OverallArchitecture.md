

# Diagram of Overall Architecture:

![image](https://github.com/5500-project/opp-api/assets/112241385/f5c2b100-efb8-4a1b-ad96-970bfc799f86)


## Front-End Application:

### 1. Web UI: 
Users interact with this layer to access all functionalities of the platform. It communicates with backend services through API calls.
### 2. Authentication: 
Handles user login, registration, and profile management interactions.
### 3. Transaction Management: 
Enables users to initiate transactions, view transaction history, etc.
### 4. User profile: 
Provides visualizations related to the profile, balances and transactions.
### 5. Notifications:
Displays alerts and notifications to the users.

## Backend Services:
### 1. User Management Service: 
Handles user authentication, profile management, and access control.
### 2. Transaction Service: 
Processes payment transactions, validating payment information, and updating transaction statuses.
### 3. Reporting Service: 
Calculates balances, generates financial reports, and provides tools for data visualization.
### 4. Payment Verificaiton Service: 
Monitors transactions for suspicious activities, implements fraud detection algorithms, and alerts users/admins.
### 5. Notification Service: 
Sends transaction alerts, system notifications, and supports customizable notification settings.
### 6. Database:
Stores user data, transaction records, financial reports, and logs for fraud detection. 

## Description of each of backend modules:

### 1. Transaction Service: 
Manages and processes payment transactions, ensuring the validity of payment information and updating the status of each transaction.

#### Attributes:
1. TransactionID
2. UserID
3. Amount
4. PaymentMethod
5. TransactionStatus

#### Methods:
1. initiateTransaction()
2. validatePaymentInfo()
3. updateTransactionStatus()


### 2. Reporting Service: 
Handles financial data, generating reports and offering visualization tools to display financial insights.

#### Attributes:
1. ReportID
2. UserID
3. DateRange
4. ReportType

#### Methods:
1. generateReport()
2. visualizeData()
3. fetchFinancialData()


### 3. User Management Service: 
Oversees user-related functionalities such as authentication, profile management, and access control to different features of the platform.

#### Attributes:
1. UserID
2. Username
3. PasswordHash
4. UserRole

#### Methods:
1. loginUser()
2. registerUser()
3. updateUserProfile()
4. checkAccessPermission()


### 4. Payment Verification Service: 
Interacts with external payment gateways to process payments, ensuring that each payment is securely and accurately handled.

#### Attributes:
1. PaymentID
2. TransactionID
3. GatewayName
4. VerificationStatus

#### Methods:
1. processPayment()
2. verifyWithGateway()
3. updatePaymentStatus()


### 5. Notification Service: 
Responsible for alerting users with transactional and system notifications based on their preferences or important system activities.

#### Attributes:

1. NotificationID
2. UserID
3. NotificationType
4. NotificationStatus

#### Methods:
1. sendNotification()
2. fetchUserPreferences()
3. updateNotificationStatus()

