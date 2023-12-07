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

  // Add more discover-related routes here

  return router;
};
