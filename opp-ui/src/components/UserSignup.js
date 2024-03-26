import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserSignUp.css";

const UserSignup = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("businessowner");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!username || !password || password !== confirmPassword || !email) {
      setError("Please enter valid username, email and matching passwords.");
      alert("Please enter valid username, email and matching passwords.");
      return;
    }

    try {
      // Simulate signup for demonstration purposes
      const newUser = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
        email: event.target.elements.email.value,
        first_name: event.target.elements.firstName.value,
        last_name: event.target.elements.lastName.value,
        phone_number: event.target.elements.phoneNumber.value,
        role: "businessowner"
      };
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "withCredentials": true
      };
      const backendURL = 'http://18.216.139.10:8000/auth/';
      const response = await axios.post(backendURL, newUser, { headers });
    
      if (response.status === 201) {
        alert("Sign Up Success.")
        navigate("/login"); 
      }
           
    } catch (error) {

      console.error("Error during signup:", error);

      // Check if it's a network error
      if (error.isAxiosError && !error.response) {
        console.error("Network error. Check your internet connection or the server URL.");
      } else if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      if (error.response.status === 400) {
        setError("Username or email already registered. Please choose a different one.");
        alert("Username or email already registered. Please choose a different one.")
      } else if (error.response.status === 422) {
        setError("Validation error. Please check your input.");
        alert("Validation error. Please check your input.")
      } else {
        setError(`Unexpected error during signup. Please try again later.${error.message}`);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            maxlength="18"
            minlength = "4"
            placeholder="Max length: 18, Min length: 4"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="example:xxx@xxx.xxx"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="example:xxx-xxx-xxxx"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {/* <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} */}

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
