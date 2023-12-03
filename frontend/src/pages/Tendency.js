import React, { useEffect, useState } from 'react';

function Tendency() {
  const [games, setGames] = useState([]);
  const [limit, setLimit] = useState(50); // 默认值为 50

  useEffect(() => {
    fetch(`http://localhost:3000/tendency?limit=${limit}`) 
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit]);

  return (
    <div>
        <h1>Top Games</h1>
        <p>Select number of games:</p>
        <select onChange={e => setLimit(parseInt(e.target.value, 10))} value={limit}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <ul>
          {games.map((game, index) => (
            <li key={index}>
              <strong>{game.queryName}</strong> - Price: ${game.priceFinal}<br />
              <img src={game.headerImage} alt={game.queryName} style={{ maxWidth: '200px' }} /><br />
              Recommendations: {game.recommendationCount}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Tendency;
