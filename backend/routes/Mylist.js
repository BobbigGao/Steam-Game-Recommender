const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // stored procedure and trigger.
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


//procedure
// CREATE DEFINER=`root`@`%` PROCEDURE `AddGameToUserList`(IN userID INT, IN queryID INT)
// BEGIN
// DECLARE totalCount INT;
// DECLARE finished INTEGER DEFAULT 0;
// DECLARE cur CURSOR FOR SELECT queryID FROM MyList WHERE userID = userID;
// DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

// INSERT INTO myList (userID, queryID) VALUES (userID, queryID);

// OPEN cur;

// my_loop: LOOP
//   FETCH cur INTO queryID;
//   IF finished = 1 THEN 
//     LEAVE my_loop;
//   END IF;

//   SELECT COUNT(*) INTO totalCount FROM myList WHERE queryID = queryID;
//   IF totalCount >= 3 THEN
//     UPDATE gameInfo SET status = 'Popular' WHERE queryID = queryID;
//   END IF;
// END LOOP my_loop;

// CLOSE cur;
// END


// trigger
// DELIMITER //
// CREATE TRIGGER IncrementRecommendationCount
// AFTER INSERT ON UserGames
// FOR EACH ROW
// BEGIN
//   -- Increment the recommendation count
//   UPDATE Games
//   SET recommendationCount = recommendationCount + 1
//   WHERE queryID = NEW.queryID;
// END //
// DELIMITER ;

