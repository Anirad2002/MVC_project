/*// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Маршрут для відображення всіх рецептів
router.get('/', recipeController.getAllRecipes);

// Маршрут для відображення форми для додавання нового рецепту
router.get('/add', recipeController.getAddRecipeForm);

// Маршрут для додавання нового рецепту
router.post('/add', recipeController.addRecipe);

// Маршрут для відображення форми для редагування рецепту за його ідентифікатором
router.get('/edit/:id', recipeController.getEditRecipeForm);

// Маршрут для редагування рецепту за його ідентифікатором
router.post('/edit/:id', recipeController.editRecipe);

// Маршрут для відображення конкретного рецепту за його ідентифікатором
router.get('/:id', recipeController.getRecipeById);

// Маршрут для видалення рецепту за його ідентифікатором
router.get('/delete/:id', recipeController.deleteRecipe);

module.exports = router;*/

// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getRecipes); // Changed from getAllRecipes to getRecipes
router.get('/add', recipeController.getRecipeById); // Changed from getAddRecipeForm to getRecipeById
router.post('/add', recipeController.addRecipe);
router.get('/:id', recipeController.getRecipeById);
router.get('/:id/edit', recipeController.getRecipeById); // Changed from getEditRecipeForm to getRecipeById
router.post('/:id/edit', recipeController.editRecipe);
router.get('/:id/delete', recipeController.deleteRecipe);

module.exports = router;
