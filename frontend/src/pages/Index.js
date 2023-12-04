// first page
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import './Index.css';

function Index() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [activeButton, setActiveButton] = useState('Discover'); 

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

        <p>Select number of games:</p>
        <select onChange={e => setLimit(parseInt(e.target.value, 10))} value={limit}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <p>Data from backend:</p>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <Link to={`/Game/${index}`}><strong>{item.queryName}</strong></Link> - Released: {item.releaseDate}<br />
              Price: ${item.priceFinal}<br />
              <Link to={`/Game/${index}`}><img src={item.headerImage} alt={item.queryName} style={{ maxWidth: '200px' }} /></Link><br />
              {item.detailedDescrip}
            </li>
          ))}
        </ul>
    </div>
    
  );
}

export default Index;
