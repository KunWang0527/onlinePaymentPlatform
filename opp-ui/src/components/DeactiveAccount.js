import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLogin.css";

const DeactiveAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const userPassword = location.state?.userPassword;
  const accessToken = location.state?.accessToken;
  const [prepassword, setPrepassword] = useState("");
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
      setError("Please enter your password.");
      return;
    }
    if(!prepassword == userPassword){
      setError("Password wrong, please enter the correct password");
    }

    try {
      // navigate("/", { state: { username } });
      // Send a request to the backend to obtain the access token

      const fetchData = async () => {
        try{

        const apiUrl = 'http://18.216.139.10:8000/auth/deactivate-my-account';

        // Perform change password after successful login
        const deactivaResponse = await axios.post(apiUrl, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        console.log('Deactive successful', deactivaResponse.data);
        console.log('Success deactive your account!');

        }catch (error){
          console.error('Error in API call:', error.message);
        }
      }
      fetchData();
    
      // Redirect to the main page after successful login
      alert("You have deactived your account! Redirect to Home page.")
      navigate("/");
    } catch (error) {
      setError(`${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Hi {username}. Deactive your account:</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prepassword">Previous password:</label>
          <input
            type="prepassword"
            id="prepassword"
            name="prepassword"
            value={prepassword}
            onChange={(e) => setPrepassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Deactive Account</button>
        </form>
      </div>
    </div>
  );
};

export default DeactiveAccount;