//routes for user like login/signup/delete account
const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

module.exports = (db) => {
  router.post('/signup', async (req, res) => {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
      return res.status(400).send('Username and password are required');
    }
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const UserID = uuidv4();
      // const listID = uuidv4();
      // const insertListIDQuery = 'INSERT INTO myList (listID, userID) VALUES (?, ?)';
      // db.query(insertListIDQuery, [listID, newUser.userID], (err, result) => {
      //   // errors may happen
      // });
      const query = 'INSERT INTO userInfo (UserID, UserName, Password) VALUES (?, ?, ?)';
      db.query(query, [UserID, UserName, hashedPassword], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Error registering new user');
        }
        res.status(201).send('User created successfully');
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/login', async (req, res) => {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
      return res.status(400).send('Username and password are required');
    }
    db.query('SELECT * FROM userInfo WHERE UserName = ?', [UserName], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error during login');
      }
      if (results.length === 0) {
        return res.status(401).send('Invalid username or password');
      }
      const user = results[0];
      const validPassword = await bcrypt.compare(Password, user.Password);
      if (!validPassword) {
        return res.status(401).send('Invalid username or password');
      }
      req.session.userID = user.UserID;
      console.log('Login successful for user:', UserName);
      res.status(200).send('Login successful');
    });
  });
  return router;
};