/*// controllers/userController.js
const User = require('../models/User');

const userController = {
    // Реєстрація нового користувача
    registerUser: async (req, res) => {
        try {
            const { email, name, password } = req.body;
            // Перевірка наявності користувача з такою ж електронною адресою
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send('Користувач з такою електронною адресою вже існує');
            }
            // Створення нового користувача
            const newUser = new User({ email, name, password });
            await newUser.save();
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },

    // Автентифікація користувача
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Перевірка наявності користувача з вказаною електронною адресою
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send('Користувача з вказаною електронною адресою не існує');
            }
            // Перевірка паролю
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).send('Неправильний пароль');
            }
            // Успішна автентифікація - перенаправлення на головну сторінку або іншу сторінку за наявності
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },

    // Оновлення профілю користувача
    updateUserProfile: async (req, res) => {
        try {
            const { name, email } = req.body;
            const userId = req.params.id; // Припустимо, що ID користувача передається в параметрах запиту
            const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
            res.json(updatedUser); // Повертаємо оновленого користувача у відповідь
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    }
};

module.exports = userController;*/

// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userController = {

  // Get the user profile
  getUserProfile: async (req, res) => {
    try {
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
      const userId = req.session.user._id;
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
      res.redirect('users/profile');
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


