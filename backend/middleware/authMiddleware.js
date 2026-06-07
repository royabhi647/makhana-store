// makhana-store > backend > middleware > authMiddleware.js

import jwt from 'jsonwebtoken';
import { dbService } from '../models/dbService.js';
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkeyformakhanaapp123');
      // Get user from DB, attach to req
      req.user = await dbService.users.findById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};