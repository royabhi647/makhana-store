// makhana-store > backend > models > dbService.js

import fs from 'fs';
import { isMongoConnected, localDbPath } from '../config/db.js';
import { User, Product, Order, Recipe } from './schemas.js';
// Helper to read local DB
const readLocalDb = () => {
  try {
    const data = fs.readFileSync(localDbPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local db:', err);
    return { users: [], products: [], orders: [], recipes: [] };
  }
};
// Helper to write local DB
const writeLocalDb = (data) => {
  try {
    fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db:', err);
  }
};
// Generate MongoDB-like ID for local JSON objects
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export const dbService = {
  // USER OPERATIONS
  users: {
    findByEmail: async (email) => {
      if (isMongoConnected) {
        return await User.findOne({ email });
      } else {
        const db = readLocalDb();
        const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        return user ? { ...user, _id: user.id || user._id } : null;
      }
    },
    findById: async (id) => {
      if (isMongoConnected) {
        return await User.findById(id).select('-password');
      } else {
        const db = readLocalDb();
        const user = db.users.find((u) => u.id === id || u._id === id);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, _id: user.id || user._id };
      }
    },
    create: async (userData) => {
      if (isMongoConnected) {
        return await User.create(userData);
      } else {
        const db = readLocalDb();
        const _id = generateId();
        const newUser = {
          _id,
          id: _id,
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        db.users.push(newUser);
        writeLocalDb(db);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
      }
    }
  },
  // PRODUCT OPERATIONS
  products: {
    findAll: async () => {
      if (isMongoConnected) {
        return await Product.find({});
      } else {
        const db = readLocalDb();
        return db.products.map(p => ({ ...p, _id: p.id || p._id }));
      }
    },
    findById: async (id) => {
      if (isMongoConnected) {
        return await Product.findById(id);
      } else {
        const db = readLocalDb();
        const product = db.products.find((p) => p.id === id || p._id === id);
        return product ? { ...product, _id: product.id || product._id } : null;
      }
    },
    create: async (productData) => {
      if (isMongoConnected) {
        return await Product.create(productData);
      } else {
        const db = readLocalDb();
        const _id = generateId();
        const newProduct = {
          _id,
          id: _id,
          ...productData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        db.products.push(newProduct);
        writeLocalDb(db);
        return newProduct;
      }
    },
    update: async (id, productData) => {
      if (isMongoConnected) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
      } else {
        const db = readLocalDb();
        const index = db.products.findIndex((p) => p.id === id || p._id === id);
        if (index === -1) return null;
        db.products[index] = {
          ...db.products[index],
          ...productData,
          updatedAt: new Date().toISOString()
        };
        writeLocalDb(db);
        return { ...db.products[index], _id: db.products[index].id || db.products[index]._id };
      }
    },
    delete: async (id) => {
      if (isMongoConnected) {
        return await Product.findByIdAndDelete(id);
      } else {
        const db = readLocalDb();
        const index = db.products.findIndex((p) => p.id === id || p._id === id);
        if (index === -1) return null;
        const deletedProduct = db.products.splice(index, 1)[0];
        writeLocalDb(db);
        return deletedProduct;
      }
    }
  },
  // ORDER OPERATIONS
  orders: {
    create: async (orderData) => {
      if (isMongoConnected) {
        return await Order.create(orderData);
      } else {
        const db = readLocalDb();
        const _id = generateId();
        const newOrder = {
          _id,
          id: _id,
          ...orderData,
          isPaid: false,
          isDelivered: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        db.orders.push(newOrder);
        writeLocalDb(db);
        return newOrder;
      }
    },
    findByUser: async (userId) => {
      if (isMongoConnected) {
        return await Order.find({ user: userId });
      } else {
        const db = readLocalDb();
        return db.orders
          .filter((o) => o.user === userId)
          .map(o => ({ ...o, _id: o.id || o._id }));
      }
    },
    findById: async (id) => {
      if (isMongoConnected) {
        return await Order.findById(id).populate('user', 'name email');
      } else {
        const db = readLocalDb();
        const order = db.orders.find((o) => o.id === id || o._id === id);
        if (!order) return null;
        const userObj = db.users.find((u) => u.id === order.user || u._id === order.user);
        return {
          ...order,
          _id: order.id || order._id,
          user: userObj ? { _id: userObj.id || userObj._id, name: userObj.name, email: userObj.email } : { name: 'Unknown User' }
        };
      }
    },
    findAll: async () => {
      if (isMongoConnected) {
        return await Order.find({}).populate('user', 'id name');
      } else {
        const db = readLocalDb();
        return db.orders.map((order) => {
          const userObj = db.users.find((u) => u.id === order.user || u._id === order.user);
          return {
            ...order,
            _id: order.id || order._id,
            user: userObj ? { _id: userObj.id || userObj._id, name: userObj.name } : { name: 'Unknown User' }
          };
        });
      }
    },
    updateToPaid: async (id, paymentResult) => {
      if (isMongoConnected) {
        return await Order.findByIdAndUpdate(
          id,
          {
            isPaid: true,
            paidAt: Date.now(),
            paymentResult
          },
          { new: true }
        );
      } else {
        const db = readLocalDb();
        const index = db.orders.findIndex((o) => o.id === id || o._id === id);
        if (index === -1) return null;
        db.orders[index] = {
          ...db.orders[index],
          isPaid: true,
          paidAt: new Date().toISOString(),
          paymentResult,
          updatedAt: new Date().toISOString()
        };
        writeLocalDb(db);
        return { ...db.orders[index], _id: db.orders[index].id || db.orders[index]._id };
      }
    },
    updateToDelivered: async (id) => {
      if (isMongoConnected) {
        return await Order.findByIdAndUpdate(
          id,
          {
            isDelivered: true,
            deliveredAt: Date.now()
          },
          { new: true }
        );
      } else {
        const db = readLocalDb();
        const index = db.orders.findIndex((o) => o.id === id || o._id === id);
        if (index === -1) return null;
        db.orders[index] = {
          ...db.orders[index],
          isDelivered: true,
          deliveredAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        writeLocalDb(db);
        return { ...db.orders[index], _id: db.orders[index].id || db.orders[index]._id };
      }
    }
  },
  // RECIPE OPERATIONS
  recipes: {
    findAll: async () => {
      if (isMongoConnected) {
        return await Recipe.find({});
      } else {
        const db = readLocalDb();
        return db.recipes.map(r => ({ ...r, _id: r.id || r._id }));
      }
    },
    findById: async (id) => {
      if (isMongoConnected) {
        return await Recipe.findById(id);
      } else {
        const db = readLocalDb();
        const recipe = db.recipes.find((r) => r.id === id || r._id === id);
        return recipe ? { ...recipe, _id: recipe.id || recipe._id } : null;
      }
    }
  }
};
