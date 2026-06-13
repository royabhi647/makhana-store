// makhana-store > backend > models > productModel.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    category: { type: String, required: true },
    flavor: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0.0 },
    nutrients: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0.0 },
      carbs: { type: Number, default: 0.0 },
      fat: { type: Number, default: 0.0 },
      fiber: { type: Number, default: 0.0 }
    },
    color: { type: String, default: '#F3E5AB' },
    image: { type: String }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
