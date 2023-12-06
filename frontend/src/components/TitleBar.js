// Title bar for all pages

import React from 'react';
import { Link } from 'react-router-dom';

function TitleBar({ activeButton, handleButtonClick }) {
  return (
    <div id="titleBar">
      <Link 
        to="/Discover"
        className={activeButton === 'Discover' ? 'active' : ''}
        onClick={() => handleButtonClick('Discover')}
      >Discover</Link> 
      <Link 
        to="/Tendency"
        className={activeButton === 'Tendency' ? 'active' : ''}
        onClick={() => handleButtonClick('Tendency')}
      >Tendency</Link> 
      <Link 
        to="/MyList"
        className={activeButton === 'My List' ? 'active' : ''}
        onClick={() => handleButtonClick('My List')}
      >My List</Link> 
      <Link 
        to="/Account"
        className={activeButton === 'Account' ? 'active' : ''}
        onClick={() => handleButtonClick('Account')}
      >Account</Link>
    </div>
  );
}

export default TitleBar;