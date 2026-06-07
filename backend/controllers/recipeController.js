// makhana-store > backend > controllers > recipeController.js

import { dbService } from '../models/dbService.js';
// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
export const getRecipes = async (req, res) => {
  try {
    const recipes = await dbService.recipes.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Fetch single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await dbService.recipes.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};