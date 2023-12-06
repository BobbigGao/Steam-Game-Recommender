import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import TitleBar from '../components/TitleBar';


function Account() {
  const { logout } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const userID = localStorage.getItem('userID');

  const updateUsername = () => {
    fetch('/api/updateUsername', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userID, newUsername }),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    });
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      fetch('/api/deleteAccount', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userID }),
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
    }
  };
  
  return (
    <div>
      <TitleBar activeButton={activeButton} handleButtonClick={setActiveButton} />

      <h1>Account Details</h1>
      <p>Username: {userName}</p>
      <p>User ID: {userID}</p>


      <input
        type="text"
        placeholder="Enter new username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button onClick={updateUsername}>Update Username</button>
      <button onClick={deleteAccount}>Delete Account</button>
      <button onClick={logout}>Logout</button>

    </div>
  );
}

export default Account;
