// Discover.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import './Index.css';

function Discover() {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [activeButton, setActiveButton] = useState('Game');
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All');
    const [priceRange, setPriceRange] = useState('Any');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
      fetch(`http://localhost:3000/discover/test-db?limit=${limit}`) 
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [limit]); 
  
    const handleButtonClick = (buttonId) => {
      setActiveButton(buttonId);
    };
  
    useEffect(() => {
      if (searchTerm) {
        fetch(`http://localhost:3000/finder/search?searchTerm=${searchTerm}`)
          .then(response => response.json())
          .then(data => setData(data)) // Assuming you want to set data for games based on searchTerm
          .catch(error => console.error('Error fetching data:', error));
      }
    }, [searchTerm]);
    
    useEffect(() => {
      if (genre !== 'All' || priceRange !== 'Any') {
        fetch(`http://localhost:3000/finder/filter?genre=${genre}&priceRange=${priceRange}`)
          .then(response => response.json())
          .then(data => setData(data)) // Assuming you want to set data for games based on genre and priceRange
          .catch(error => console.error('Error fetching data:', error));
      }
    }, [genre, priceRange]);    

    useEffect(() => {
      fetch(`http://localhost:3000/finder/sort?sortBy=${sortBy}`)
        .then(response => response.json())
        .then(data => setData(data)) // Assuming you want to set data for games based on sortBy
        .catch(error => console.error('Error fetching data:', error));
    }, [sortBy]);
    
    return (
      <div>
        <TitleBar activeButton={activeButton} handleButtonClick={handleButtonClick} />
    
        <h1>Game Search</h1>
        
        <input
          type="text"
          placeholder="Search for games"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select onChange={(e) => setGenre(e.target.value)} value={genre}>
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          {/* Add more genres */}
        </select>
        
        <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
          <option value="Any">Any Price</option>
          <option value="20">Under $20</option>
          <option value="50">Under $50</option>
          {/* Add more price ranges */}
        </select>
        
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="queryID">ID</option>
          <option value="priceFinal">Price</option>
          {/* Add more sort options */}
        </select>
    
        <p>Select number of games:</p>
        <select onChange={e => setLimit(parseInt(e.target.value, 10))} value={limit}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
    
        <p>Data from backend:</p>
        <ul>
          {data.slice(0, limit).map((item, index) => (
            <li key={index}>
              <Link to={`/Game/${index}`}>
                <strong>{item.queryName}</strong>
              </Link>
              - Released: {item.releaseDate}<br />
              Price: ${item.priceFinal}<br />
              <Link to={`/Game/${index}`}>
                <img src={item.headerImage} alt={item.queryName} style={{ maxWidth: '200px' }} />
              </Link><br />

            </li>
          ))}
        </ul>

      </div>
    );    
}

export default Discover;
