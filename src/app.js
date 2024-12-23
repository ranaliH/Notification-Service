const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Database connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to send notifications
app.post('/send-notifications', (req, res) => {
  const { patientId, appointmentId } = req.body;
  const notificationDate = new Date();

  const query = 'INSERT INTO notifications (patientId, appointmentId, notificationDate) VALUES (?, ?, ?)';
  db.query(query, [patientId, appointmentId, notificationDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, patientId, appointmentId, notificationDate });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Notification Service is running on port ${port}`);
});
