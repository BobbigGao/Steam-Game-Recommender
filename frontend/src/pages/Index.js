// Discover.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import './Index.css';

const ItemsPerPage = 10; // Set the number of items to display per page

function Discover() {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('Game');
    const [searchTerm, setSearchTerm] = useState('');
    //const [genre, setGenre] = useState('All');
    const [priceRange, setPriceRange] = useState('Any');
    const [sortBy, setSortBy] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
      fetch(`http://localhost:3000/discover/test-db`) 
        .then(response => response.json())
        .then(newData => {
          setData(newData);
          setTotalPages(Math.ceil(newData.length / ItemsPerPage));
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []); 
  
    useEffect(() => {
      if (searchTerm) {
        fetch(`http://localhost:3000/finder/search?searchTerm=${searchTerm}`)
          .then(response => response.json())
          .then(newData => {
            setData(newData);
            setTotalPages(Math.ceil(newData.length / ItemsPerPage));
          })
          .catch(error => console.error('Error fetching data:', error));
      }
    }, [searchTerm]);
    
    useEffect(() => {
      if (priceRange !== 'Any') {
        fetch(`http://localhost:3000/finder/filter?priceRange=${priceRange}`)
          .then(response => response.json())
          .then(newData => {
            setData(newData);
            setTotalPages(Math.ceil(newData.length / ItemsPerPage));
          })
          .catch(error => console.error('Error fetching data:', error));
      }
    }, [priceRange]);

    useEffect(() => {
      fetch(`http://localhost:3000/finder/sort?sortBy=${sortBy}`)
        .then(response => response.json())
        .then(newData => {
          setData(newData);
          setTotalPages(Math.ceil(newData.length / ItemsPerPage));
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [sortBy]);
    
    const handleButtonClick = (buttonId) => {
      setActiveButton(buttonId);
    };

    // Function to change page
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
        
        {/* <select onChange={(e) => setGenre(e.target.value)} value={genre}>
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
        </select> */}
        
        <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
          <option value="Any">Any Price</option>
          <option value="5">Under $5</option>
          <option value="10">Under $10</option>
          {/* Add more price ranges */}
        </select>
        
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="releaseDate">Release Date Recent to Old</option>
          <option value="priceFinal">Price Low to High</option>
          {/* Add more sort options */}
        </select>

        <ul>
          {currentItems.map((item, index) => (
            <li key={index}>
              <Link to={`/Game/${item.queryID}`}>
                <strong>{item.queryName}</strong>
              </Link>
              - Released: {item.releaseDate}<br />
              Price: ${item.priceFinal}<br />
              <Link to={`/Game/${item.queryID}`}>
                <img src={item.headerImage} alt={item.queryName} style={{ maxWidth: '200px' }} />
              </Link><br />

            </li>
          ))}
        </ul>

        <div>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
             Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

      </div>
    );    
}

export default Discover;
