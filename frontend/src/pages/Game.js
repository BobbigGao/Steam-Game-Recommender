// game detail page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

function Game() {
  const [data, setData] = useState([]);
  const [reviewText, setReviewText] = useState(''); // State to store review text
  const [limit] = useState(10); // Fixed incorrect destructuring
  // Removed unused state [activeButton, setActiveButton]
  let { game_index } = useParams();
  game_index = parseInt(game_index, 10);

  useEffect(() => {
    fetch(`http://localhost:3000/discover/test-db?limit=${limit}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [limit]);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/reviews/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryID: data[game_index].queryID,
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
    setReviewText(event.target.value); // Update review text state
  };

  return (
    <div>
      <TitleBar />

      {data.length > game_index && (
        <div>
          <h1><strong>{data[game_index].queryName}</strong></h1> - Released: {data[game_index].releaseDate}<br />
          Price: ${data[game_index].priceFinal}<br />
          <img src={data[game_index].headerImage} alt={data[game_index].queryName} style={{ maxWidth: '200px' }} /><br />
          {data[game_index].detailedDescrip}

          {/* Form to submit a review */}
          <form onSubmit={handleReviewSubmit}>
            <textarea 
              value={reviewText}
              onChange={handleReviewChange}
              placeholder="Enter your review here..."
              style={{ width: '50%', height: '100px' }}
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Game;
