// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршрут для відображення форми реєстрації
//router.get('/register', userController.getRegisterForm);

// Маршрут для обробки реєстрації користувача
//router.post('/register', userController.registerUser);

// Маршрут для відображення форми авторизації
//router.get('/login', userController.getLoginForm);

// Маршрут для обробки авторизації користувача
//router.post('/login', userController.loginUser);

// Маршрут для відображення профілю користувача
router.get('/profile', userController.getUserProfile);

// Маршрут для редагування інформації профілю користувача
router.post('/profile/edit', userController.editUserProfile);

// Маршрут для виходу користувача з системи
router.get('/logout', userController.logoutUser);

module.exports = router;
