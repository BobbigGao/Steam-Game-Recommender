// game detail page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

function Game() {
    const [data, setData] = useState([]);
    const limit = useState(10);
    const [activeButton, setActiveButton] = useState('Game');
    let { game_index } = useParams();
    game_index = parseInt(game_index, 10); // Convert index to a number
  
    useEffect(() => {
      fetch(`http://localhost:3000/discover/test-db?limit=${limit}`) 
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [limit]); 
  
    const handleButtonClick = (buttonId) => {
      setActiveButton(buttonId); // Update the active button state
    };
  
    return (
      <div>
        <TitleBar activeButton={activeButton} handleButtonClick={handleButtonClick} />

          {data.length > game_index && ( // Check if the index exists in the data
            <div>
              <h1><strong>{data[game_index].queryName}</strong></h1> - Released: {data[game_index].releaseDate}<br />
              Price: ${data[game_index].priceFinal}<br />
              <img src={data[game_index].headerImage} alt={data[game_index].queryName} style={{ maxWidth: '200px' }} /><br />
              {data[game_index].detailedDescrip}
            </div>
          )}
      </div>
    );
  }

export default Game;