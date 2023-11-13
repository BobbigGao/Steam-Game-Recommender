// signup page
import React, { useState } from 'react';

function Signup() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: UserName, Password: Password })
      });
      if (response.ok) {
        console.log('User created successfully');
        // redirect to index page
        window.location.href = "/";

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
