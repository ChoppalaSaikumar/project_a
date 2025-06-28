const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 5000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true                // Allow credentials (cookies, tokens, etc.)
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jaya2580@',
  database: 'login_system'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Helper function to generate random strings
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to authenticate and set req.user (mock implementation)
const authenticateUser = (req, res, next) => {
  // Mock user authentication; replace with real token/session validation
  req.user = { id: 1, username: 'mockUser' }; // Mocked user ID and username
  next();
};

// API route for creating a user
app.post('/api/create-user', (req, res) => {
  const { name, dob, place, aadharNo } = req.body;

  const username = generateRandomString(8);
  const password = generateRandomString(12);

  const query = 'INSERT INTO user (username, password, name, dob, place, aadhar_no) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [username, password, name, dob, place, aadharNo], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error creating user', error: err.message });
    }
    res.status(200).json({ message: 'User created successfully', username, password });
  });
});

// API route for user login
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  const query = role === 'admin' 
    ? 'SELECT * FROM admin WHERE username = ? AND password = ?'
    : 'SELECT * FROM user WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ message: 'Error logging in', error: err.message });
    }

    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful', role });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// API route to get all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM user';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
    res.status(200).json(results);
  });
});

// API route to get a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM user WHERE id = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// API route to update a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, name, dob, place, aadhar_no } = req.body;

  const fetchQuery = 'SELECT * FROM user WHERE id = ?';
  
  db.query(fetchQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateQuery = `
      UPDATE user
      SET username = ?, name = ?, dob = ?, place = ?, aadhar_no = ?
      WHERE id = ?
    `;

    db.query(updateQuery, [username, name, dob, place, aadhar_no, userId], (error) => {
      if (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Failed to update user', error: error.message });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });
});

// API route for profile information
app.get('/profile', (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const query = 'SELECT username, name, dob, place, aadhar_no, id FROM user WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// API route for registering a candidate
app.post('/api/register-candidate', upload.fields([{ name: 'photo' }, { name: 'logo' }]), (req, res) => {
  const { name, age, party } = req.body;
  const photo = req.files['photo'] ? req.files['photo'][0].buffer : null;
  const logo = req.files['logo'] ? req.files['logo'][0].buffer : null;

  const query = 'INSERT INTO candidates (name, age, party, photo, logo) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, age, party, photo, logo], (err) => {
    if (err) {
      console.error('Error inserting candidate data:', err);
      return res.status(500).json({ message: 'Error registering candidate', error: err.message });
    }
    res.status(200).json({ message: 'Candidate registered successfully' });
  });
});

// API route to fetch candidate data
app.get('/api/candidates', (req, res) => {
  const query = 'SELECT id, name, party,age, TO_BASE64(photo) AS photo FROM candidates';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err);
      return res.status(500).json({ message: 'Error fetching candidates', error: err.message });
    }
    res.status(200).json(results);
  });
});

app.get('/api/candidates2', (req, res) => {
  const query = 'SELECT id, name, party,age, vote_count, TO_BASE64(photo) AS photo FROM candidates';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching candidates:', err);
      return res.status(500).json({ message: 'Error fetching candidates', error: err.message });
    }
    res.status(200).json(results);
  });
  
});

// API route for voting
app.post('/api/vote', authenticateUser, (req, res) => {
  const { candidateId } = req.body;
  const username = req.user.username;
  
  if (!candidateId) {
    return res.status(400).json({ message: 'Candidate ID is required' });
  }

  const getUserIdQuery = 'SELECT id, has_voted FROM user WHERE username = ?';

  db.query(getUserIdQuery, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { id: userId, has_voted } = results[0];
    
    if (has_voted) {
      return res.status(400).json({ message: 'User has already voted' });
    }

    const voteQuery = 'UPDATE candidates SET vote_count = vote_count + 1 WHERE id = ?';
    const updateUserVoteStatus = 'UPDATE user SET has_voted = true WHERE id = ?';

    db.query(voteQuery, [candidateId], (err) => {
      if (err) {
        console.error('Error updating vote count:', err);
        return res.status(500).json({ message: 'Error updating vote count', error: err.message });
      }

      db.query(updateUserVoteStatus, [userId], (err) => {
        if (err) {
          console.error('Error updating user vote status:', err);
          return res.status(500).json({ message: 'Error updating user vote status', error: err.message });
        }

        res.status(200).json({ message: 'Vote cast successfully' });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
