const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // get user's mylist
  router.get('/:userID', (req, res) => {
    const { userID } = req.params;
    const query = `
      SELECT gameInfo.queryID, gameInfo.queryName, gameInfo.headerImage, gameInfo.priceFinal 
      FROM myList
      INNER JOIN gameInfo ON myList.queryID = gameInfo.queryID
      WHERE myList.userID = ?
    `;
    db.query(query, [userID], (err, gamesInList) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error fetching my list');
      }
      res.json(gamesInList);
    });
  });

  // add game to mylist
  router.post('/:userID', (req, res) => {
    const { userID } = req.params;
    const { queryID } = req.body; // ID of game
    const insertQuery = `
      INSERT INTO MyList (userID, queryID) VALUES (?, ?)
    `;
    db.query(insertQuery, [userID, queryID], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error adding game to my list');
      }
      res.status(201).send('Game added to my list');
    });
  });

  return router;
};
