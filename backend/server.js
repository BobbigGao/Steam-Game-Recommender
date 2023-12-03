require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 

const userRoutes = require('./routes/User');
const finderRoutes = require('./routes/finder');
const discoverRoutes = require('./routes/Discover');

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
app.use(cors()); 
app.use(express.json()); 
 

app.use('/user', userRoutes(db));
app.use('/discover', discoverRoutes(db));
app.use('/finder', finderRoutes(db));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

