// makhana-store > backend > controllers > productController.js

import { dbService } from '../models/dbService.js';
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await dbService.products.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await dbService.products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, flavor, stock, nutrients, color } = req.body;
    const newProduct = await dbService.products.create({
      name: name || 'Sample Product',
      price: price || 0,
      description: description || 'Sample Description',
      category: category || 'Plain',
      flavor: flavor || 'Plain',
      stock: stock || 0,
      rating: 0,
      nutrients: nutrients || { calories: 350, protein: 9, carbs: 75, fat: 2, fiber: 14 },
      color: color || '#F3E5AB'
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const updated = await dbService.products.update(req.params.id, req.body);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await dbService.products.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};