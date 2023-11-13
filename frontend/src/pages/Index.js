// first page
import React, { useEffect, useState } from 'react';

function Index() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch(`http://localhost:3000/discover/test-db?limit=${limit}`) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit]); 

  return (
    <div>
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
              <strong>{item.queryName}</strong> - Released: {item.releaseDate}<br />
              Price: ${item.priceFinal}<br />
              <img src={item.headerImage} alt={item.queryName} style={{ maxWidth: '200px' }} /><br />
              {item.detailedDescrip}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Index;
