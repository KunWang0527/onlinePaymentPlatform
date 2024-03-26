import React, {useState, useEffect} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Account.css";

function AccountPage() {
  const location = useLocation();
  const username = location.state?.username;
  const userPassword = location.state?.userPassword;
  const accessToken = location.state?.accessToken;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const handleLogout = () => {
    // Redirect to the main page after logout
    navigate("/");
  };
  useEffect(() => {
    if (!username || !accessToken) {
      navigate("/");
    }
    const fetchData = async () => {
      try{
        const apiUrl = 'http://18.216.139.10:8000/transaction/get_completed';
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };

        const secondResponse = await axios.get(apiUrl, { headers });   
        console.log('API Response:', secondResponse.data);
        setTransactionHistory(secondResponse.data);

      }catch (error){
        console.error('Error in API call:', error.message);
      }
    }
    //call function
    fetchData();
  }, [username, page]);
  const report = {
    status: "completed",
    user_id: "3",
    amount: 17.0,
    transaction_date:"2023-11-21T22:42:07.953692",
    id:7,
    payment_method:"debit"
  }
  
  const userReport = transactionHistory[transactionHistory.length - 1];

  // Check if userReport is defined before accessing its properties
  const status = userReport?.status || 'N/A';
  const userId = userReport?.user_id || 'N/A';
  const amount = userReport?.amount || 'N/A';
  const transactionDate = userReport?.transaction_date || 'N/A';
  const paymentMethod = userReport?.payment_method || 'N/A';


  const handleNavigationClick = (path) => {
    // Check if the user is logged in
    if (!username || !accessToken) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the specified path
      if (path === "/home") {
        // If the path is "/home", navigate to the main page with the username
        navigate("/", { state: { username, accessToken, userPassword } });
      } else if (path === "/payment") {
        // Otherwise, navigate to the specified path
        navigate("/payment", { state: { username, accessToken, userPassword } });
      } else if (path === "/manage") {
        navigate("/account", { state: { username, accessToken, userPassword } });
      } else if (path == "/history") {
        navigate("/history", { state: { username, accessToken, userPassword } });
      }
    }
  };
  const handleChangePasswordClick = () => {
    // Navigate to "/change-password" and pass username and accessToken
    navigate("/change-password", { state: { username, accessToken, userPassword } });
  };
  const handleDeactiveClick = () => {
    // Navigate to "/change-password" and pass username and accessToken
    navigate("/deactive", { state: { username, accessToken, userPassword } });
  };
  const handleNavigationClick2 = () => {
    // Navigate to "/history" and pass username and accessToken
    navigate("/history", { state: { username, accessToken, userPassword } });
  };
  const handleNavigationClick3 = () => {
    // Navigate to "/history" and pass username and accessToken
    navigate("/payment-pending", { state: { username, accessToken, userPassword } });
  };
  const handleNavigationClick4 = () => {
    // Navigate to "/history" and pass username and accessToken
    navigate("/payment-finished", { state: { username, accessToken, userPassword } });
  };
  // Use the username to fetch user information from the backend

  return (
    <body>
      <header className="header">
        <h1>Logo</h1>
        <nav>
          <ul>
            {/* Navigation links */}
            <li>
              <span onClick={() => handleNavigationClick("/home")}>Home</span>
            </li>
            <li>
              <span onClick={() => handleNavigationClick("/payment")}>
                Make Transaction
              </span>
            </li>

            <li>
              <span onClick={() => handleNavigationClick("/history")}>
                Payment History
              </span>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="user-profile-container">
      <div className="left-side">
      <div className="left-corner">
        <h3>Welcome, {username}!</h3>
        <img
          src="https://i.pinimg.com/474x/ba/f2/f8/baf2f87b72d2d5762ec58ab42d63d1b1.jpg"
          alt="User Avatar"
          className="user-avatar"
          style={{ width: '280px', height: 'auto' }}
        />
      </div>
        <nav className="user-navigation">
          <ul>
            <li>
              <button onClick={handleChangePasswordClick}>Change User Password</button>
            </li>
            <li>
              <button onClick={handleDeactiveClick}>Deactivate User</button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="right-side">
        <h4><b>Financial Report:</b> This is your latest completed transaction!</h4>
        {/*financial report details */}
        <div className="finance-report">
            <h2>Transaction Details</h2>
            <div className="status">
                <strong>Status:</strong> {status}
            </div>
            <div className="user-id">
                <strong>User ID:</strong> {userId}
            </div>
            <div className="amount">
                <strong>Amount:</strong> ${amount}
            </div>
            <div className="transaction-date">
                <strong>Transaction Date:</strong> {transactionDate}
            </div>
            <div className="payment-method">
                <strong>Payment Method:</strong> {paymentMethod}
            </div>
        </div>
        <nav className="user-navigation-footer">
          <ul>
          <li>
            <button  onClick={handleNavigationClick2}>
              Show All Transaction History
            </button>
            </li>
            <li>
            <button  onClick={handleNavigationClick3}>
              Show Pending Transactions
              </button>
            </li>
            <li>
            <button  onClick={handleNavigationClick4}>
              Show Finished Transactions
            </button>
            </li>

          </ul>
        </nav>


      </div>
    </div>
    </main>
    </body>
  );
}

export default AccountPage;
