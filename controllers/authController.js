// controllers/authController.js
const User = require('../models/User');

const authController = {
  // Отримати форму реєстрації
  getRegisterForm: (req, res) => {
    res.render('auth/register');
  },

  // Реєстрація нового користувача
  registerUser: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      // Перевірка, чи користувач з такою ж електронною адресою існує вже
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Користувач з цією електронною адресою вже існує');
      }
      // Створення нового користувача
      const newUser = new User({ email, name, password });
      await newUser.save();
      res.redirect('login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Помилка сервера');
    }
  },

  // Отримати форму авторизації
  getLoginForm: (req, res) => {
    res.render('auth/login');
  },

  // Аутентифікація користувача
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Перевірка, чи користувач з вказаною електронною адресою існує
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Користувача з цією електронною адресою не існує');
      }
      // Перевірка пароля
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(401).send('Неправильний пароль');
      }
      // Успішна аутентифікація - зберегти інформацію про користувача в сесії
      req.session.isAuthenticated = true;
      req.session.user = {
        _id: user._id,
        email: user.email,
        name: user.name
      };
      res.redirect('../users/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Помилка сервера');
    }
  },
  
  // Вийти з системи
  logoutUser: (req, res) => {
    req.session.isAuthenticated = false; // Встановлення isAuthenticated у false при виході
    req.session.destroy();
    res.redirect('/');
  }
};

module.exports = authController;
