// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Маршрут для відображення форми реєстрації
router.get('/register', authController.getRegisterForm);

// Маршрут для обробки реєстрації користувача
router.post('/register', authController.registerUser);

// Маршрут для відображення форми авторизації
router.get('/login', authController.getLoginForm);

// Маршрут для обробки авторизації користувача
router.post('/login', authController.loginUser);

// Маршрут для виходу користувача
router.get('/logout', authController.logoutUser);

module.exports = router;
