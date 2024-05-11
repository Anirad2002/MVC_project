// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const crypto = require('crypto');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(config.mongoURI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Generate a secret key for sessions using crypto
const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
}));

// Middleware to set isAuthenticated variable for views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

app.use('/', recipeRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
