
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршрут для відображення профілю користувача
router.get('/profile', userController.getUserProfile);

// Маршрут для редагування інформації профілю користувача
router.post('/profile/edit', userController.editUserProfile);


module.exports = router;
