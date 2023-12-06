import React, { useEffect, useState } from 'react';

function Account() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the username from the backend
    fetch('http://localhost:3000/account', {
      credentials: 'include' // Needed to include the session cookie in the request
    }) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch the username');
      }
      return response.json();
    })
    .then(data => setUsername(data.UserName))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Account Details</h1>
      {username ? (
        <p>Welcome, {username}</p>
      ) : (
        <p>You are not logged in or could not fetch user details.</p>
      )}
    </div>
  );
}

export default Account;
