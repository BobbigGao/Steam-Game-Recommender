import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import TitleBar from '../components/TitleBar';


function Account() {
  const { logout } = useAuth();
  const [activeButton, setActiveButton] = useState('Account');

  const userName = localStorage.getItem('userName');
  const userID = localStorage.getItem('userID');



  return (
    <div>
      <TitleBar activeButton={activeButton} handleButtonClick={setActiveButton} />

      <h1>Account Details</h1>
      <p>Username: {userName}</p>
      <p>User ID: {userID}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Account;
