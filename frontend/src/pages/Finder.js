// finder page (w/ search bar, filter... etc)
import React, { useState, useEffect } from 'react';

function GameSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All');
  const [priceRange, setPriceRange] = useState('Any');
  const [sortBy, setSortBy] = useState('name');
  const [games, setGames] = useState([]);

  // Fetch games based on search
  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:3000/finder/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [searchTerm]);

  // Fetch games based on filter
  useEffect(() => {
    if (genre !== 'All' || priceRange !== 'Any') {
      fetch(`http://localhost:3000/finder/filter?genre=${genre}&priceRange=${priceRange}`)
        .then(response => response.json())
        .then(data => setGames(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [genre, priceRange]);

  // Fetch games based on sort
  useEffect(() => {
    fetch(`http://localhost:3000/finder/sort?sortBy=${sortBy}`)
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [sortBy]);

  return (
    <div>
      <h1>Game Search</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Genre Filter */}
      <select onChange={(e) => setGenre(e.target.value)} value={genre}>
        <option value="All">All Genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        {/* Add more genres */}
      </select>
      
      {/* Price Range Filter */}
      <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
        <option value="Any">Any Price</option>
        <option value="20">Under $20</option>
        <option value="50">Under $50</option>
        {/* Add more price ranges */}
      </select>
      
      {/* Sorting */}
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="queryID">ID</option>
        <option value="priceFinal">Price</option>
        {/* Add more sort options */}
      </select>

      {/* Game List */}
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <strong>{game.queryName}</strong> - Genre: {game.genre} - Price: ${game.priceFinal}
            {/* Display images and other game information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameSearch;
