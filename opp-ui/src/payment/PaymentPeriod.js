import React, { useState, useEffect }from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentHistory.css";

function PaymentPeriod(){
    const location = useLocation();
    const username = location.state?.username;
    const accessToken = location.state?.accessToken;
    const userPassword = location.state?.userPassword;
    const navigate = useNavigate();
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalAmount, setTotalAmount] = useState(0)
    const [searchPerformed, setSearchPerformed] = useState(false)

    // Pagination logic
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactionHistory.slice(indexOfFirstItem, indexOfLastItem);
    
    const handleLogout = () => {
        // Redirect to the main page after logout
        navigate("/");
    };
    const handleNavigationClick2 = () => {
        navigate("/history", { state: { username, accessToken, userPassword } });
    };
    const handleNavigationClick3 = () => {
        navigate("/payment-pending", { state: { username, accessToken, userPassword } });
    };
    const handleNavigationClick4 = () => {
        navigate("/payment-finished", { state: { username, accessToken, userPassword } });
    };
    const handleSearch = () => {
        fetchData();
        setSearchPerformed(true);
      };
    
    useEffect(() => {
      if (!username || !accessToken) {
        navigate("/");
      }
        fetchData();
      }, [username, page, startDate, endDate]);
    const fetchData = async () => {
      try {
        const apiUrl = "http://18.216.139.10:8000/transaction/total_balance_time_period";
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const params = {
          start_date: startDate,
          end_date: endDate,
        };
  
        const response = await axios.get(apiUrl, { params, headers });
        console.log("API Response:", response.data);
        // Update total amount based on API response
        setTotalAmount(response.data); 
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
      
    
    const handleNavigationClick = (path) => {
        // Check if the user is logged in
        if (!username) {
          // If not logged in, redirect to the login page
          navigate("/login");
        } else {
          // If logged in, navigate to the specified path
          if (path === "/home") {
            // If the path is "/home", navigate to the main page with the username
            navigate("/", { state: { username, accessToken} });
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
    const renderTransactionHistory = () => {
        return currentItems.map((transaction) => (
        <div key={transaction.id}>
            {/* Render individual transaction history item */}
            <p>Transaction ID: {transaction.id}</p>
            <p>Status: {transaction.status}</p>
            <p>User ID: {transaction.user_id}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {transaction.transaction_date}</p>
            <p>Payment Method: {transaction.payment_method}</p>
            <hr />
        </div>
        ));
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return(
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
                <span onClick={() => handleNavigationClick("/manage")}>
                  Manage Account
                </span>
              </li>
              <li>
                <span onClick={() => handleNavigationClick("/payment")}>
                  Make Transaction
                </span>
              </li>
  
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </nav>
        </header>


        <div className="transaction-history-container">
        <section className = "payment-buttons">
            <button className="payment-button" onClick={handleNavigationClick2}>
              Show All Transaction History
            </button>
            <button className="payment-button" onClick={handleNavigationClick3}>
              Show Pending Transactions
            </button>
            <button className="payment-button" onClick={handleNavigationClick4}>
              Show Finished Transactions
            </button>
        </section>
        <div className="PaymentPeriod">
          <div className="date-selection">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
          {searchPerformed && (
            <div className="total-amount">
              <p>Total Amount: ${totalAmount}</p>
            </div>
          )}
        </div>
        </div>
        </body>  

    );

}
export default PaymentPeriod;