const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

module.exports = (db) => {
    router.post('/comment', async (req, res) => {
        const {commentText } = req.body;
      
        try {
          const commentID = uuidv4(); 
          const ratingDate = new Date().toLocaleString();  
          const userID = req.session.userID;
          const queryID = 10;
          const query = 'INSERT INTO reviews (commentID, userID, queryID, commentText, ratingDate) VALUES (?, ?, ?, ?, ?)';
          db.query(query, [commentID, userID, queryID, commentText, ratingDate], (err, result) => {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).send('Error posting comment');
            }
            res.status(201).send('Comment posted successfully');
          });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      });

  return router;
};
