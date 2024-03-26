import React from "react";
import Header from "./Header";
import "../styles/MainPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const username = location.state?.username;
  const userPassword = location.state?.userPassword;
  const accessToken = location.state?.accessToken;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the main page after logout
    navigate("/");
  };
  const handleServiceClick = (serviceLink) => {
    // Check if the user is logged in
    if (!username || !accessToken) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the respective service webpage
      navigate(serviceLink, { state: { username, accessToken, userPassword } });
    }
  };
  const handleNavigationClick = (path) => {
    // Check if the user is logged in
    if (!username) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the specified path
      navigate(path, { state: { username, accessToken, userPassword } });
    }
  };
  const handleFeatureHelpHomeClick = (path) =>{
    // Check if the user is logged in
    if (!username) {
      // If not logged in, redirect to the login page
      navigate(path);
    } else {
      // If logged in, navigate to the specified path
      navigate(path, { state: { username, accessToken, userPassword } });
    }
  }

  return (
    <body>
      <div>
        <h1>Logo</h1>
      </div>
      <div>
        <Header username={username} onLogout={handleLogout} />
      </div>
      <div className="main-page">
        <section className="Nav bar">
          <nav className="navigation-bar">
            <ul>
              <li>
                <span onClick={() => handleNavigationClick("/account")}>
                  Account
                </span>
              </li>
              <li>
                <span onClick={() => handleNavigationClick("/payment")}>
                  Transaction
                </span>
              </li>
              <li>
                <span onClick={() => handleNavigationClick("/history")}>
                  Payment History
                </span>
              </li>
              <li>
                <span onClick={() => handleFeatureHelpHomeClick("/features")}>
                  Features
                </span>
              </li>
              <li>
                <span onClick={() => handleFeatureHelpHomeClick("/help")}>
                  Help
                </span>
              </li>
            </ul>
          </nav>
        </section>

        <section className="introduction">
          {/* Introduction boxes */}
          <div className="intro-container">
            <div className="intro-box">
              <h2 className="box-title">Quick Transaction Initiation</h2>
              <p className="box-content">
              This feature allows users to quickly initiate a payment transaction. 
              Users can enter the payment cardnumber, payment amount, and select the 
              preferred payment method. The system will validate the transaction details,
               process the payment, and provide immediate feedback to the user.
              </p>
              {/* <button type="button" onClick={handleNavigationClick(("/payment"))}>
              Try a transaction now!
              </button> */}
              <figure className="box-figure"></figure>
            </div>
          </div>
        </section>
        <section className="introduction">
          {/* Introduction boxes */}
          <div className="intro-container">
            <div className="intro-box">
              <h2 className="box-title">Financial Overview Dashboard</h2>
              <p className="box-content">
              This feature provides users with a comprehensive dashboard displaying 
              their financial overview. Users can view their current balance, recent transactions,
               and access detailed financial reports for a specified date range.
              </p>
              <figure className="box-figure"></figure>
            </div>
          </div>
        </section>
        <section>
          {/* Main service boxes */}
          <div className="main-service-container">
            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/account")}
            >
              <h2>Account</h2>
              <p>Manage your personal account.</p>
            </div>

            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/payment")}
            >
              <h2>Transaction</h2>
              <p>Make a transaction now!</p>
            </div>

            <div
              className="main-service-box"
              onClick={() => handleServiceClick("/history")}
            >
              <h2>Payment History</h2>
              <p>Find your payment history.</p>
            </div>

            <div 
            className="main-service-box"
            onClick={() => handleFeatureHelpHomeClick("/features")}
            >
              <h2>Features</h2>
              <p>Find all features.</p>
            </div>
          </div>
        </section>
        <div className="footer">
          <p>
            &copy; Team Snoopy.
          </p>
        </div>
      </div>
    </body>
  );
}

export default MainPage;
