import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/FeaturePage.css';
import Header from "./Header";

const FeaturesPage = () => {
    const location = useLocation();
    const username = location.state?.username;
    const accessToken = location.state?.accessToken;
    const userPassword = location.state?.userPassword;
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // logout logic here 
      // Redirect to the main page after logout
      navigate("/");
    };

  useEffect(() => {
    // You can include any additional initialization logic here
  }, []);

  const handleNavigationClick = (path) => {
    // Check if the user is logged in

    if (!username || !accessToken) {
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
                <span onClick={() => handleFeatureHelpHomeClick("/")}>
                  Home
                </span>
              </li>
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
                <span onClick={() => handleFeatureHelpHomeClick("/help")}>
                  Help
                </span>
              </li>
            </ul>
          </nav>
        </section>
        </div>
    <div className="features-page">
    <div className="feature-section">
        <h2>Web UI</h2>
        <p>
        Users interact with this layer to access all functionalities of the
        platform. It communicates with backend services through API calls.
        </p>
        <p>
        The Web UI is designed with a user-friendly interface, providing an
        intuitive experience for users to navigate through various features of the
        platform.
        </p>
        {/* Additional content for Web UI */}
    </div>

    <div className="feature-section">
        <h2>Authentication</h2>
        <p>
        Handles user login, registration, and profile management interactions.
        </p>
        <p>
        Our authentication system employs robust security measures to ensure the
        confidentiality and integrity of user data.
        </p>
    </div>

    <div className="feature-section">
        <h2>Transaction Management</h2>
        <p>
        Enables users to initiate transactions, view transaction history, etc.
        </p>
        <p>
        The Transaction Management feature provides a seamless and secure way for
        users to handle financial transactions within the platform.
        </p>
    </div>

    <div className="feature-section">
        <h2>User Profile</h2>
        <p>
        Provides visualizations related to the profile, balances, and transactions.
        </p>
        <p>
        Users can customize their profiles, track balances in real-time, and
        analyze their transaction history through detailed visualizations.
        </p>
    </div>

    <div className="feature-section">
        <h2>Notifications</h2>
        <p>Displays alerts and notifications to the users.</p>
        <p>
        Stay informed with our Notifications feature, which keeps users updated
        on important events, account activities, and security alerts.
        </p>
    </div>
    </div>

    </body>
  );
}

export default FeaturesPage;
