// makhana-store > backend > server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to Database (MongoDB or JSON Fallback)
connectDB();
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recipes', recipeRoutes);
// Root path diagnostic
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Makhana Store API is working',
    time: new Date()
  });
});
// Fallback to static client build path in production (optional, let's keep it clear for now)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
// Error middlewares
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
