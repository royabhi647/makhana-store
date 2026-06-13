// makhana-store > backend > controllers > authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbService } from '../models/dbService.js';
// Token generation helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkeyformakhanaapp123', {
    expiresIn: '30d'
  });
};
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await dbService.users.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Default first user as Admin for demonstration simplicity, or standard logic
    const isFirstUserAdmin = email.toLowerCase() === 'admin@makhana.com';
    const user = await dbService.users.create({
      name,
      email,
      password, // Plain password, hashing delegated to dbService / userModel
      isAdmin: isFirstUserAdmin
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbService.users.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await dbService.users.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
