import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup (allow all origins)
app.use(cors());

// Endpoint to save user data (POST)
app.post('/api/saveUserData', (req, res) => {
  const dataFilePath = path.join('user_data.json');

  // Read existing user data
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data file:', err);
      return res.status(500).json({ error: 'Failed to read user data' });
    }

    let userData = JSON.parse(data);
    const newUser = req.body; // Assuming the body contains username, email, and password

    // Add the new user to the data array
    userData.push(newUser);

    // Write updated user data back to file
    fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        console.error('Error writing user data file:', err);
        return res.status(500).json({ error: 'Failed to save user data' });
      }

      // Respond with success message
      res.status(200).json({ message: 'User data saved successfully' });
    });
  });
});

// Endpoint to fetch all user data (GET)
app.get('/api/getAllUserData', (req, res) => {
  const dataFilePath = path.join('user_data.json');

  // Read existing user data
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data file:', err);
      return res.status(500).json({ error: 'Failed to read user data' });
    }

    const userData = JSON.parse(data);
    res.status(200).json(userData);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
