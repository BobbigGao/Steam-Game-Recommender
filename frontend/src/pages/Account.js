import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';
import { useNavigate } from 'react-router-dom'; 

function Account() {
  const [username, setUsername] = useState('');
  const [activeButton, setActiveButton] = useState('Account');
  const navigate = useNavigate();

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

  const navigateToSignup = () => {
    navigate("/signup"); 
  };

  return (
    <div>
      <TitleBar activeButton={activeButton} handleButtonClick={setActiveButton} />
      <h1>Account Details</h1>
      {username ? (
        <p>Welcome, {username}</p>
      ) : (
        <p>You are not logged in or could not fetch user details.</p>
      )}
      <button onClick={navigateToSignup} type="button">Delete Account</button>
    </div>
  );
}

export default Account;
