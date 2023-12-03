// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   router.get('/', (req, res) => {
//     const query = `
//       SELECT 
//         gameInfo.queryName, 
//         gameInfo.headerImage, 
//         gameInfo.priceFinal, 
//         recommendation.RecommendationCount 
//       FROM gameInfo
//       INNER JOIN recommendation ON gameInfo.queryID = recommendation.queryID 
//       ORDER BY recommendation.RecommendationCount DESC
//     `;
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).send('Error fetching game list');
//       }
//       res.status(200).json(results);
//     });
//   });

//   return router;
// };

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // 使用 parseInt 并提供一个默认值
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    if (isNaN(limit)) {
      return res.status(400).send('Limit must be a valid number');
    }
  
    const query = `
      SELECT 
        gameInfo.queryName, 
        gameInfo.headerImage, 
        gameInfo.priceFinal, 
        recommendation.recommendationCount 
      FROM gameInfo
      INNER JOIN recommendation ON gameInfo.queryID = recommendation.queryID 
      ORDER BY recommendation.recommendationCount DESC
      LIMIT ?
    `;
    db.query(query, [limit], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error fetching game list');
      }
      res.status(200).json(results);
    });
  });
  
  return router;
};
