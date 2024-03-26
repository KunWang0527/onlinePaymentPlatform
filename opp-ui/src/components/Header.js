import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    onLogout();

    // Redirect to the main page after logout
    navigate("/");
  };
  // Inside login or signup component
  const handleLogin = () => {
    // logic here
    const username = "John"; // Replace this with the actual username

    // Navigate to the main page with the username state
    navigate("/", { state: { username } });
  };

  return (
    <div className="header">
      {username ? (
        <>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
