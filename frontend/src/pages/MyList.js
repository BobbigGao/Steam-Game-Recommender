import React, { useEffect, useState } from 'react';
import TitleBar from '../components/TitleBar';

function MyList() {
  const [games, setGames] = useState([]);
  const userID = localStorage.getItem('userID'); 
  const [activeButton, setActiveButton] = useState('My List');

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:3000/mylist/${userID}`)
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('Error fetching my list:', error));
    }
  }, [userID]); 



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
