// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   router.post('/add-to-mylist', (req, res) => {
//     const { queryID } = req.body;
//     const userID = req.session.userID;
  
//     // get listID
//     const insertQuery = 'INSERT INTO myList (listID, queryID, userID) VALUES (?, ?, ?)';
//     db.query(insertQuery, [listID, queryID, userID], (err, result) => {
//       // ...
//     });
//   });  

//     return router;
// };

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // 添加游戏到MyList
  router.post('/mylist', (req, res) => {
    const { queryID } = req.body;
    const userID = req.session.userID; // 获取用户ID

    // 检查是否已经有此游戏在MyList中
    const checkExistQuery = 'SELECT * FROM myList WHERE queryID = ? AND userID = ?';
    db.query(checkExistQuery, [queryID, userID], (existErr, existResults) => {
      if (existErr) {
        return res.status(500).send('Error checking for game in My List');
      }
      if (existResults.length > 0) {
        return res.status(409).send('Game already in My List');
      } else {
        // 游戏不在MyList中，可以添加
        const insertQuery = 'INSERT INTO myList (queryID, userID) VALUES (?, ?)';
        db.query(insertQuery, [queryID, userID], (insertErr, insertResults) => {
          if (insertErr) {
            return res.status(500).send('Error adding game to My List');
          }
          return res.status(201).send('Game added to My List successfully');
        });
      }
    });
  });

  // 获取MyList中的游戏
  router.get('/mylist/:userID', (req, res) => {
    const userID = req.params.userID;

    const selectQuery = `
      SELECT gi.queryID, gi.queryName, gi.priceFinal, gi.headerImage
      FROM GameInfo gi
      JOIN myList ml ON gi.queryID = ml.queryID
      WHERE ml.userID = ?`;

    db.query(selectQuery, [userID], (selectErr, results) => {
      if (selectErr) {
        return res.status(500).send('Error fetching My List');
      }
      return res.json(results);
    });
  });

  return router;
};
