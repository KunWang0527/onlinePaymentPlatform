import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLogin.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const apiUrl = 'http://18.216.139.10:8000/auth/token/';
    const requestData = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    };

    // Convert data to URL-encoded format
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(requestData)) {
      formData.append(key, value);
    }

    // Make a POST request using Axios
    axios.post(apiUrl, formData, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      const accessToken = response.data.access_token;
  
      // Save the access token in local storage or a cookie for future requests
      localStorage.setItem("accessToken", accessToken);
      alert("Log in success, your will be directed to Home page.")
      navigate("/", { state: { username, accessToken, password } });
    })
    .catch(error => {
      console.error('Error:', error);
      if(error.response.status === 401){
        setError("Wrong password or username, please check again");
      }else{
        setError(`Please check error message ${error.message}`);
      }
    });
    // const handleLogin = async () => {
    //   try {
    //     const response = await axios.post(apiUrl, formData, {
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     });
    
    //     console.log('Success:', response.data);
    //     const accessToken = response.data.access_token;
    
    //     // Save the access token in local storage or a cookie for future requests
    //     localStorage.setItem("accessToken", accessToken);
    //     alert("Log in success, you will be directed to the Home page.");
    //     navigate("/", { state: { username, accessToken } });
    //   } catch (error) {
    //     console.error('Error:', error);
    //     if (error.response && error.response.status === 401) {
    //       setError("Wrong password or username, please check again");
    //     } else {
    //       setError(`Please check error message: ${error.message}`);
    //     }
    //   }
    // };
    // handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
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
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        {/* <p className="forgot-password">Forgot your password?</p> */}
        <a href="/signup" className="forgot-password">
          First time for our website? Click here!
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
