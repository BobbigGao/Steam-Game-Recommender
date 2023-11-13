// login page

import React, { useState } from 'react';

function Login() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');

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
        // redirect to index page
        window.location.href = "/";
      } else {
        console.error('Login failed');
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
