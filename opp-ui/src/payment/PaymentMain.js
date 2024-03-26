import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentMain.css";

function PaymentMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const accessToken = location.state?.accessToken;
  const userPassword = location.state?.userPassword;
  const [user_id, setUserID] = useState("");
  const [amount, setAmount] = useState(0);
  const [card_number, setCardNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const [error, setError] = useState("");
  useEffect(() => {
    // Check if the user is not logged in, then redirect to the homepage
    if (!username || !accessToken) {
      navigate("/");
    }
  }, [username]);

  const handleNavigationClick = (path) => {
    // Check if the user is logged in
    if (!username) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the specified path
      if (path === "/home") {
        // If the path is "/home", navigate to the main page with the username
        navigate("/", { state: { username, accessToken, userPassword } });
      } else if (path === "/account") {
        // Otherwise, navigate to the specified path
        navigate("/account", { state: { username, accessToken, userPassword } });
      }else if (path === "/history") {
        // Otherwise, navigate to the specified path
        navigate("/history", { state: { username, accessToken, userPassword } });
      }
    }
  };

  let isSubmitting = false;
  const handleNextButtonClick = async (event) => {
    event.preventDefault();
    if(isSubmitting){
      alert("Submission is processing");
      return;
    }

    if (!amount || !card_number ) {
      setError("Please enter amount and card number!");
      return;
    }
    isSubmitting = true;

    const params = {
      card_number: card_number,
      amount: amount,
      payment_method: paymentMethod
    };

    const headers = {
      'accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }; 

    const apiUrl = 'http://18.216.139.10:8000/transaction/initiate';
    axios.post(apiUrl, null, { params, headers })
    .then(response => {
      console.log('API Response:', response.data);
      if(response.status === 200){
        if(response.data.success === true){
          alert(`${response.data.msg}`);
          navigate("/payment-process", { state: { username, accessToken,
            userDataToSend: { amount, paymentMethod, card_number } } });}
        }
    })
    .catch(error => {
      console.error('Error:', error.message);
      setError(`An error occurred while processing the transaction.${error.message}`);
      alert(`Transaction rejected!${error.message}`);
    })
    .finally(() => {
      isSubmitting = false;
    });
  };

  const handleLogout = () => {
    // Redirect to the main page after logout
    navigate("/");
  };
  

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
              <span onClick={() => handleNavigationClick("/account")}>
                My Account
              </span>
            </li>
            <li>
                <span onClick={() => handleNavigationClick("/history")}>
                  Payment History
                </span>
              </li>
            <li onClick={handleLogout}>Logout</li>
            {/* ... */}
          </ul>
        </nav>
      </header>
      <p>Welcome {username}, here is the form to send money.</p>
      <div className="payment-container">
        <div className="left-part">
          <h2>Send Money</h2>
          <form id="send-money-form">

            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />

            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <br />

            <label htmlFor="card_number">Card number</label>
            <input
              type="text"
              id="card_number"
              name="card_number"
              value = {card_number}
              required
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <br />
            <button type="button" onClick={handleNextButtonClick}>
              Next
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="right-part">
          <h2>More Ways to Send</h2>
          <div className="more-ways-section">
            <p>Send to a bank account</p>
            <p>Recieve cash pick up</p>
            <p>Send an invoice</p>
            <p>Send and receive donations</p>
            <p>Find support and help others now.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; 2023 CompanyXXX. All rights reserved. | Privacy Policy | Terms
          of Service
        </p>
      </footer>
    </body>
  );
}
export default PaymentMain;
