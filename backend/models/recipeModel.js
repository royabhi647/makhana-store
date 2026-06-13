// makhana-store > backend > models > recipeModel.js

import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    difficulty: { type: String, required: true },
    servings: { type: Number, required: true, default: 1 },
    image: { type: String },
    ingredients: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        unit: { type: String, required: true }
      }
    ],
    instructions: [{ type: String, required: true }],
    nutrients: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0.0 },
      carbs: { type: Number, default: 0.0 },
      fat: { type: Number, default: 0.0 }
    }
  },
  { timestamps: true }
);

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);
export default Recipe;
