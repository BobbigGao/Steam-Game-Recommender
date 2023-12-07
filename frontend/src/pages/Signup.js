// signup page
import React, { useState } from 'react';

function Signup() {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: UserName, Password: Password })
      });
      if (response.ok) {
        console.log('User created successfully');
        window.location.href = "/";
      } else {
        const errorText = await response.text(); 
        setErrorMessage(errorText); 
        console.error('Signup failed:', errorText);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An unexpected error occurred');
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default Signup;
