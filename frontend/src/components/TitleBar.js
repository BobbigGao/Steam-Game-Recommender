// Title bar for all pages

import React from 'react';
import { Link } from 'react-router-dom';

function TitleBar({ activeButton, handleButtonClick }) {
  return (
    <div id="titleBar">
      <Link 
        to="/"
        className={activeButton === 'Discover' ? 'active' : ''}
        onClick={() => handleButtonClick('Discover')}
      >Discover</Link> 
      <Link 
        to="/Tendency"
        className={activeButton === 'Recommendation' ? 'active' : ''}
        onClick={() => handleButtonClick('Recommendation')}
      >Recommendation</Link> 
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