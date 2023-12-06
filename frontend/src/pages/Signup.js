import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import useAuth

function Signup() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName, Password })
      });
      if (response.ok) {
        console.log('User created successfully');
        login(); // Update the isAuthenticated state
        navigate("/");
      } else {
        console.error('Signup failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
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
          <button type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default Signup;