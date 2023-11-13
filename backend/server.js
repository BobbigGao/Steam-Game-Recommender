require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the database');
});

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test-db', (req, res) => {
  let limit = parseInt(req.query.limit, 10) || 10;
  if (limit > 15) limit = 15; 

  db.query('SELECT * FROM gameInfo LIMIT ?', [limit], (err, results) => {
    if (err) {
      return res.status(500).send('Error executing the query');
    }
    res.json(results);
  });
});

app.post('/signup', async (req, res) => {
  const { UserName, Password } = req.body;
  if (!UserName || !Password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const UserID = uuidv4();
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = db;
