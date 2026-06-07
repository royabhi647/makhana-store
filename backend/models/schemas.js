// makhana-store > backend > models > schemas.js

import mongoose from 'mongoose';
// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);
// Product Schema
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
// Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.Mixed, required: true } // Can be ObjectId or custom mix info
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);
// Recipe Schema
const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    difficulty: { type: String, required: true },
    servings: { type: Number, required: true, default: 1 },
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
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);