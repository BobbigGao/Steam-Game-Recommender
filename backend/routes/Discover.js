const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/test-db', (req, res) => {
    let sqlQuery = 'SELECT * FROM gameInfo';

    db.query(sqlQuery, (err, results) => {
      if (err) {
        return res.status(500).send('Error executing the query');
      }
      res.json(results);
    });
  });

  router.get('/game/:game_id', (req, res) => {
    const gameId = req.params.game_id;
    let sqlQuery = 'SELECT * FROM gameInfo WHERE queryID = ?';

    db.query(sqlQuery, [gameId], (err, results) => {
      if (err) {
        return res.status(500).send('Error executing the query');
      }
      if (results.length === 0) {
        return res.status(404).send('Game not found');
      }
      res.json(results[0]); // Send the first (and presumably only) result
    });
  });
  return router;
};
