import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLogin.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const accessToken = location.state?.accessToken;
  const [prepassword, setPrepassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    // Check if the user is not logged in, then redirect to the homepage
    if (!username || !accessToken) {
      navigate("/");
    }
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form inputs
    if (!prepassword) {
      setError("Please enter previous password.");
      return;
    }
    if(!newpassword){
      setError("Please enter your new password.");
    }
    if(!confirmPassword || !confirmPassword === newpassword){
      setError("Please confirm your new password.");
    }

    try {
      // navigate("/", { state: { username } });
      // Send a request to the backend to obtain the access token
      const newUser = {
        old_password: prepassword,
        new_password: newpassword
      }
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(newUser)) {
        formData.append(key, value);
      }

      const fetchData = async () => {
        try{

        // Data for changing password
        const old_password = 'password';
        const new_password = 'password1'
        const apiUrl = 'http://18.216.139.10:8000/auth';
        const changePasswordUrl = `${apiUrl}/change-password?old_password=${prepassword}&new_password=${newpassword}`;

        // Perform change password after successful login
        const changePasswordResponse = await axios.post(changePasswordUrl,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        console.log('Change Password Successful:', changePasswordResponse.data);
        console.log('Login and Change Password successful!');

        }catch (error){
          console.error('Error in API call:', error.message);
        }
      }
      fetchData();

      async function loginAndChangePassword() {
        const apiUrl = 'http://18.216.139.10:8000/auth';
        const loginUrl = `${apiUrl}/token/`;
    
        // Data for login
        const loginData = new URLSearchParams();
        loginData.append('username', 'user1');
        loginData.append('password', 'password');
    
        try {
            // Perform login
            const loginResponse = await axios.post(loginUrl, loginData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            console.log('Login Successful:', loginResponse.data);
    
            // Extract the access token from the login response
            const accessToken = loginResponse.data.access_token;
    
            // Data for changing password
            const old_password = 'password';
            const new_password = 'password1'
            const changePasswordUrl = `${apiUrl}/change-password?old_password=${old_password}&new_password=${new_password}`;
    
            // Perform change password after successful login
            const changePasswordResponse = await axios.post(changePasswordUrl,{}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            console.log('Change Password Successful:', changePasswordResponse.data);
            console.log('Login and Change Password successful!');
        } catch (error) {
            console.error('Error:', error.message);
            console.log('Error during login or changing password.');
        }
    }
    
      // Redirect to the main page after successful login
      alert("Change password success! Redirect to Login page.")
      navigate("/login");
    } catch (error) {
      setError(`${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Hi {username}. Change your password:</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prepassword">Previous password:</label>
          <input
            type="prepassword"
            id="prepassword"
            name="prepassword"
            value={prepassword}
            onChange={(e) => setPrepassword(e.target.value)}
          />

          <label htmlFor="newpassword">New password:</label>
          <input
            type="newpassword"
            id="newpassword"
            name="newpassword"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm new password:</label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
