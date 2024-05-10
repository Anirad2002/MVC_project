/*// controllers/recipeController.js
const Recipe = require('../models/Recipe');

const recipeController = {
    // Отримати всі рецепти
    getRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find();
            res.render('recipes/allRecipes', { recipes });
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },
    
    // Отримати рецепт за ID
    getRecipeById: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).send('Рецепт не знайдено');
            }
            res.render('recipes/singleRecipe', { recipe });
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },
    
    // Додати новий рецепт
    addRecipe: async (req, res) => {
        try {
            const { title, ingredients, instructions } = req.body;
            const newRecipe = new Recipe({ title, ingredients, instructions });
            await newRecipe.save();
            res.redirect('/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },
    
    // Редагувати рецепт
    editRecipe: async (req, res) => {
        try {
            const { title, ingredients, instructions } = req.body;
            await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
            res.redirect(`/recipes/${req.params.id}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    },
    
    // Видалити рецепт
    deleteRecipe: async (req, res) => {
        try {
            await Recipe.findByIdAndDelete(req.params.id);
            res.redirect('/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).send('Помилка сервера');
        }
    }
};

module.exports = recipeController;*/

// controllers/recipeController.js
const Recipe = require('../models/Recipe');

const recipeController = {
 // Get all recipes
 getRecipes: async (req, res) => {
   try {
     const recipes = await Recipe.find();
     res.render('recipes/allRecipes', { recipes });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 },

 // Get form to add a new recipe
 getAddRecipeForm: (req, res) => {
   res.render('recipes/addRecipe');
 },

 // Add a new recipe
 addRecipe: async (req, res) => {
   try {
     const { title, ingredients, instructions } = req.body;
     const newRecipe = new Recipe({ title, ingredients, instructions });
     await newRecipe.save();
     res.redirect('/recipes');
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 },

 // Get a single recipe by ID
 getRecipeById: async (req, res) => {
   try {
     const recipe = await Recipe.findById(req.params.id);
     if (!recipe) {
       return res.status(404).send('Recipe not found');
     }
     res.render('recipes/singleRecipe', { recipe });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 },

 // Get form to edit a recipe
 getEditRecipeForm: async (req, res) => {
   try {
     const recipe = await Recipe.findById(req.params.id);
     if (!recipe) {
       return res.status(404).send('Recipe not found');
     }
     res.render('recipes/editRecipe', { recipe });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 },

 // Edit an existing recipe
 editRecipe: async (req, res) => {
   try {
     const { title, ingredients, instructions } = req.body;
     await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
     res.redirect(`/recipes/${req.params.id}`);
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 },

 // Delete a recipe
 deleteRecipe: async (req, res) => {
   try {
     await Recipe.findByIdAndDelete(req.params.id);
     res.redirect('/recipes');
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
 }
};

module.exports = recipeController;
