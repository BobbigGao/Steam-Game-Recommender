import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10); 

  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/test-db?limit=${limit}`) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit]); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: UserName, Password: Password })
      });
      if (response.ok) {
        console.log('User created successfully');
      } else {
        console.error('Signup failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">

      <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={UserName} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
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


      </header>
    </div>
  );
}

export default App;
