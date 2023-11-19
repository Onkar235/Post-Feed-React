// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/postsfeed', { useNewUrlParser: true, useUnifiedTopology: true });

// Models
const Post = require('./models/Post');
const User = require('./models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// CORS middleware for development purposes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key-here', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Unauthorized' });

    req.user = decoded.user;
    next();
  });
};

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new post
app.post('/api/posts', verifyToken, async (req, res) => {
  const { userName, text } = req.body;

  try {
    // Ensure that the userName from the request matches the authenticated user
    if (userName !== req.user.username) {
      return res.status(403).json({ error: 'Forbidden - Unauthorized user' });
    }

    const newPost = new Post({ userName, text });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a comment to a post
app.post('/api/posts/:id/comments', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const { userName, text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ userName, text });
    const savedPost = await post.save();
    res.json(savedPost.comments[savedPost.comments.length - 1]);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id, username: user.username } }, 'your-secret-key-here');
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
