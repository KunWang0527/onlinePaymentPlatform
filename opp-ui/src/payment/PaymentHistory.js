import React, { useState, useEffect }from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentHistory.css";

function PaymentHistory(){
    const location = useLocation();
    const username = location.state?.username;
    const accessToken = location.state?.accessToken;
    const userPassword = location.state?.userPassword;
    const navigate = useNavigate();
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [page, setPage] = useState(1);

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

    useEffect(() => {
      if (!username || !accessToken) {
        navigate("/");
      }

        //setTransactionHistory(transactionHistories);
        // Fetch transaction history data from the backend
        const fetchData = async () => {
          try{
            const apiUrl = 'http://18.216.139.10:8000/transaction/';
            const headers = {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Use the token here
            };

            const secondResponse = await axios.get(apiUrl, { headers });   
            console.log('API Response:', secondResponse.data);
            setTransactionHistory(secondResponse.data);

          }catch (error){
            console.error('Error in API call:', error.message);
          }
        }
        // Call the async function
        fetchData();
      }, [username, page]);
      
    
    const handleNavigationClick = (path) => {
        // Check if the user is logged in
        if (!username || !accessToken) {
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

    const handleNavigationClick2 = () => {
      navigate("/history", { state: { username, accessToken, userPassword } });
    };
    const handleNavigationClick3 = () => {
      navigate("/payment-pending", { state: { username, accessToken, userPassword } });
    };
    const handleNavigationClick4 = () => {
      navigate("/payment-finished", { state: { username, accessToken, userPassword } });
    };
    const handleNavigationClick5 = () => {
      navigate("/period", { state: { username, accessToken, userPassword } });
    };
    //test case
    const transactionHistories = [
        {
          status: "completed",
          user_id: "1",
          amount: 25.0,
          transaction_date: "2023-11-20T14:30:00.000Z",
          id: 1,
          payment_method: "credit",
        },
        {
          status: "failed",
          user_id: "1",
          amount: 30.0,
          transaction_date: "2023-11-21T10:15:00.000Z",
          id: 2,
          payment_method: "debit",
        },
        {
          status: "completed",
          user_id: "2",
          amount: 15.0,
          transaction_date: "2023-11-22T18:45:00.000Z",
          id: 3,
          payment_method: "credit",
        },
        {
          status: "completed",
          user_id: "3",
          amount: 40.0,
          transaction_date: "2023-11-23T12:20:00.000Z",
          id: 4,
          payment_method: "debit",
        },
        {
          status: "failed",
          user_id: "2",
          amount: 22.0,
          transaction_date: "2023-11-24T09:00:00.000Z",
          id: 5,
          payment_method: "credit",
        },
        {
          status: "completed",
          user_id: "3",
          amount: 18.0,
          transaction_date: "2023-11-25T16:30:00.000Z",
          id: 6,
          payment_method: "debit",
        },
      ];



    return(
        <body>
        <header className="header">
          <h1>Logo</h1>
          <nav>
            <ul>
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
            <button className="payment-button" onClick={handleNavigationClick5}>
              Show Balance Within Time Period
            </button>
          </section>
        {renderTransactionHistory()}

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= transactionHistory.length}
          >
            Next
          </button>
        </div>
      </div>
        </body>  

    );

}
export default PaymentHistory;