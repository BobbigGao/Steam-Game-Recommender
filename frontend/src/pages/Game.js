// game detail page
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

function Game() {
  const [data, setData] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const { game_id } = useParams(); 
  const gameData = data.find(game => game.queryID === parseInt(game_id, 10));

  const userID = 'userID'; 

  useEffect(() => {
    fetch(`http://localhost:3000/discover/test-db`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/reviews/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // queryID: data[game_index].queryID,
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
    fetch(`http://localhost:3000/mylist/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryID: gameData.queryID }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => console.log('Game added to My List:', data))
    .catch(error => console.error('Error adding game to My List:', error));
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


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import TitleBar from '../components/TitleBar';

// function Game() {
//   const [data, setData] = useState([]);
//   const [reviewText, setReviewText] = useState(''); // State to store review text
//   const [limit] = useState(10); // Fixed incorrect destructuring
//   // Removed unused state [activeButton, setActiveButton]
//   let { game_id } = useParams();
//   game_id = parseInt(game_id, 10);
//   const gameData = data.find(game => game.queryID === game_id);


//   useEffect(() => {
//     fetch(`http://localhost:3000/discover/test-db`)
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleReviewSubmit = (event) => {
//     event.preventDefault();
//     fetch('http://localhost:3000/reviews/comment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         // queryID: data[game_index].queryID,
//         commentText: reviewText,
//       }),
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Network response was not ok.');
//     })
//     .then(data => console.log('Review submitted:', data))
//     .catch(error => console.error('Error submitting review:', error));
//   };

//   const handleReviewChange = (event) => {
//     setReviewText(event.target.value); // Update review text state
//   };

//   return (
//     <div>
//       <TitleBar />

//       {gameData && (
//         <div>
//           <h1><strong>{gameData.queryName}</strong></h1> - Released: {gameData.releaseDate}<br />
//           Price: ${gameData.priceFinal}<br />
//           <img src={gameData.headerImage} alt={gameData.queryName} style={{ maxWidth: '200px' }} /><br />
//           {gameData.detailedDescrip}

//           {/* Form to submit a review */}
//           <form onSubmit={handleReviewSubmit}>
//             <textarea 
//               value={reviewText}
//               onChange={handleReviewChange}
//               placeholder="Enter your review here..."
//               style={{ width: '50%', height: '100px' }}
//             />
//             <button type="submit">Submit Review</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Game;
