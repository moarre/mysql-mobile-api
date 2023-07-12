// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'rentitdb' //edit your db
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Create an Express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Define an API endpoint for retrieving user data
app.get('/users', (req, res) => {
  // SQL query to retrieve user data
  const sql = 'SELECT * FROM users';

  // Execute the query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error retrieving user data' });
      return;
    }

    // Return the retrieved user data as a JSON response
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
