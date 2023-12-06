const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/addGameToMyList', (req, res) => {
    const { userID, gameID } = req.body;
    
    const query = 'CALL AddGameToUserList(?, ?)';
    db.query(query, [userID, gameID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding game to MyList');
        }
        res.status(200).send('Game added to MyList successfully');
    });
});

  return router;
};
