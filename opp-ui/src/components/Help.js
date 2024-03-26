import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/FeaturePage.css';
import Header from "./Header";

const HelpPage = () => {
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
                <span onClick={() => handleFeatureHelpHomeClick("/features")}>
                  Features
                </span>
              </li>
            </ul>
          </nav>
        </section>
        </div>
    <div className="features-page">
    <div className="feature-section">
        <h2>🌟 Help ✨</h2>
        <p>
            ✨ Need a sprinkle of assistance?</p>
        <p>🚀Drop us a line at kwang97527@gmail.com/liu.boya@northeastern.edu/yclu28@gmail.com 
        <p>🧙‍♂️with your username, a dash of the problem, 
                and any other enchanting details.</p>    </p>
        <p>🧚‍♂️ We're here to help you! 😊✨</p>
    </div>

    <div className="feature-section">
        <h2>🌟 Feedback: Sprinkle Us with Your Thoughts! ✨</h2>
        <p>
        🌟 We'd love to hear your thoughts to sprinkle some extra magic on our app!🌟 
        <p>🚀 Share your feedback and enchanting advice with us at yclu28@gmail.com/liu.boya@northeastern.edu/kwang97527@gmail.com.</p>
        <p>Your feedback will help us keep our app spellbindingly awesome! 🧙‍♂️💫</p>
        </p>
    </div>

    </div>

    </body>
  );
}

export default HelpPage;
