const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // search function
  router.get('/search', (req, res) => {
    const { searchTerm } = req.query;
    db.query('SELECT * FROM gameInfo WHERE queryName LIKE ?', [`%${searchTerm}%`], (err, results) => {
      if (err) {
        return res.status(500).send('Error executing the query');
      }
      res.json(results);
    });
  });


  // filter
  // router.get('/filter', (req, res) => {
  //   const {priceRange } = req.query;
  //   db.query('SELECT * FROM gameInfo WHERE priceFinal <= ?', [`%${priceRange}%`], (err, results) => {
  //     if (err) {
  //       return res.status(500).send('Error executing the query');
  //     }
  //     res.json(results);
  //   });
  // });
  router.get('/filter', (req, res) => {
    const { priceRange } = req.query;

    let query = 'SELECT * FROM gameInfo';
    let params = [];

    if (priceRange && priceRange !== 'Any') {
        query += ' WHERE priceFinal <= ?';
        params.push(priceRange);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).send('Error executing the query');
        }
        res.json(results);
    });
});
 

  // sort
  router.get('/sort', (req, res) => {
    const { sortBy } = req.query;
    db.query(`SELECT * FROM gameInfo ORDER BY ${sortBy} DESC`, (err, results) => {
      if (err) {
        return res.status(500).send('Error executing the query');
      }
      res.json(results);
    });
  });
  return router;
};
