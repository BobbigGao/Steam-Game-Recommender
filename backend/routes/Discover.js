const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/test-db', (req, res) => {
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit > 15) limit = 15; 
  
    db.query('SELECT * FROM gameInfo LIMIT ?', [limit], (err, results) => {
      if (err) {
        return res.status(500).send('Error executing the query');
      }
      res.json(results);
    });
  });

  // Add more discover-related routes here

  return router;
};
