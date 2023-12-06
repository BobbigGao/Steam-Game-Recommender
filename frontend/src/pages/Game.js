// game detail page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

function Game() {
  const [data, setData] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const { game_id } = useParams(); 
  const gameData = data.find(game => game.queryID === parseInt(game_id, 10));


  const handleReviewSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/reviews/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryID: gameData.queryID,
        commentText: reviewText,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => console.log('Review submitted:', data))
    .catch(error => console.error('Error submitting review:', error));
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleAddToMyList = () => {
    fetch('http://localhost:3000/mylist/addGameToMyList', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameID: gameData.queryID }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Game added to My List:', data);
    })
    .catch(error => {
      console.error('Error adding game to My List:', error);
    });
  };

  return (
    <div>
      <TitleBar />

      {gameData && (
        <div>
          <h1><strong>{gameData.queryName}</strong></h1> - Released: {gameData.releaseDate}<br />
          Price: ${gameData.priceFinal}<br />
          <img src={gameData.headerImage} alt={gameData.queryName} style={{ maxWidth: '200px' }} /><br />
          {gameData.detailedDescrip}

          <form onSubmit={handleReviewSubmit}>
            <textarea 
              value={reviewText}
              onChange={handleReviewChange}
              placeholder="Enter your review here..."
              style={{ width: '50%', height: '100px' }}
            />
            <button type="submit">Submit Review</button>
          </form>

          <button onClick={handleAddToMyList}>Save Game to My List</button>
        </div>
      )}
    </div>
  );
}

export default Game;