// routes/account.js

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => { // Changed from '/details' to '/'
    const userID = req.session.userID;

    if (!userID) {
      return res.status(403).send('User is not logged in.');
    }

    const query = 'SELECT UserName FROM userInfo WHERE UserID = ?';
    db.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error fetching user details.');
      }
      if (results.length > 0) {
        const { UserName } = results[0];
        res.json({ UserName });
      } else {
        res.status(404).send('User not found.');
      }
    });
  });

  return router;
};
