// routes/account.js

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post('/updateUsername', (req, res) => {
    const { userID, newUsername } = req.body;
    const query = 'UPDATE userInfo SET UserName = ? WHERE UserID = ?';
    db.query(query, [newUsername, userID], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error updating username.');
      }
      res.send('Username updated successfully.');
    });
  });

  router.delete('/deleteAccount', (req, res) => {
    const { userID } = req.body;
    const query = 'DELETE FROM userInfo WHERE UserID = ?';
    db.query(query, [userID], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error deleting account.');
      }
      res.send('Account deleted successfully.');
    });
  });

  return router;
};
