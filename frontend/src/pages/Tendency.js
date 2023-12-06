import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

function Tendency() {
  const [games, setGames] = useState([]);
  const [limit, setLimit] = useState(50); // 默认值为 50
  const [activeButton, setActiveButton] = useState('Tendency');

  useEffect(() => {
    fetch(`http://localhost:3000/tendency/recommend?limit=${limit}`)
    .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      <TitleBar activeButton={activeButton} handleButtonClick={handleButtonClick} />
        <h1>Recommended</h1>
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
              <Link to={`/Game/${game.queryID}`}><strong>{game.queryName}</strong></Link><br />
              <Link to={`/Game/${game.queryID}`}><img src={game.headerImage} alt={game.queryName} style={{ maxWidth: '200px' }} /></Link><br />
              Recommendations: {game.RecommendationCount}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Tendency;
