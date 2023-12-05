import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName, Password })
      });
      if (response.ok) {
        console.log('Login successful');
        // Use navigate to redirect to index page
        navigate("/index"); // Navigates to the index route
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  const navigateToSignup = () => {
    navigate("/signup"); // 使用你的注册页面的路由路径
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
