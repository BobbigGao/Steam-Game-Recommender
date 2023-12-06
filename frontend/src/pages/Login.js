import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import useAuth

function Login() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName, Password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userName', data.UserName); 
        localStorage.setItem('userID', data.UserID);  
        login();
        navigate("/");
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={UserName} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={navigateToSignup} type="button">Do not have an account? Signup</button>
      </form>
    </div>
  );
}

export default Login;