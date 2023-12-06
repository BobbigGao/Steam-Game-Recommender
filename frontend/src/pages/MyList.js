import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';

function MyList() {
  const [games, setGames] = useState([]);
  const userID = localStorage.getItem('userID'); 
  const [activeButton, setActiveButton] = useState('My List');

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:3001/mylist/${userID}`)
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('Error fetching my list:', error));
    }
  }, [userID]); 

 
  const handleAddGameToMyList = (queryID) => {
    fetch('http://localhost:3001/mylist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
   
      },
      body: JSON.stringify({ queryID }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add game to my list');
      }
    })
    .then(data => {

      return fetch(`http://localhost:3001/mylist/${userID}`);
    })
    .then(response => response.json())
    .then(data => {
      setGames(data); 
    })
    .catch(error => {
      console.error('Error adding game to my list:', error);
    });
  };


  return (
    <div>
      <TitleBar activeButton={activeButton} handleButtonClick={setActiveButton} />
      <h1>My List</h1>
      {games.length > 0 ? (
        <ul>
          {games.map(game => (
            <li key={game.queryID}>
              <strong>{game.queryName}</strong> - Price: ${game.priceFinal}
              <br />
              <img src={game.headerImage} alt={game.queryName} style={{ maxWidth: '100px' }} />
              <button onClick={() => handleAddGameToMyList(game.queryID)}>Add to My List</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your list is empty.</p>
      )}
    </div>
  );
}

export default MyList;
