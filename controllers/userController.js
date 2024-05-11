const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userController = {
  // Get the user profile
  getUserProfile: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.redirect('../auth/login');
      }
      const userId = req.session.user._id;
      const user = await User.findById(userId);
      res.render('users/profile', { user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // Edit the user profile
  editUserProfile: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.redirect('../auth/login');
      }
      const userId = req.session.user._id;
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
      res.redirect('/users/profile'); // Fixed the redirect URL
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

module.exports = userController;
