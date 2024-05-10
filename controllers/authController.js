
// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {
  // Get the registration form
  getRegisterForm: (req, res) => {
    res.render('auth/register');
  },

  // Register a new user
  registerUser: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      // Check if a user with the same email exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User with this email already exists');
      }
      // Create a new user
      const newUser = new User({ email, name, password });
      await newUser.save();
      res.redirect('login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Get the login form
  getLoginForm: (req, res) => {
    res.render('auth/login');
  },

  // Authenticate a user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if a user with the provided email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('User with this email does not exist');
      }
      // Check the password
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
      }
      // Successful authentication - save user information in the session
      if (req.session) {
        req.session.user = {
          _id: user._id,
          email: user.email,
          name: user.name
        };
      }
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Logout the user
  logoutUser: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
};

module.exports = authController;

