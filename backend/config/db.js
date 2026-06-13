// makhana-store > backend > config > db.js
 
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export let isMongoConnected = false;
// Path to local fallback database JSON
export const localDbPath = path.join(__dirname, '../data/db.json');
// Initialize local DB file with default structure if it doesn't exist
const initializeLocalDb = () => {
  const dataDir = path.dirname(localDbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(localDbPath)) {
    const seedProducts = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'products.json'), 'utf-8')
    );
    const seedRecipes = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'recipes.json'), 'utf-8')
    );
    const initialDb = {
      users: [],
      products: seedProducts,
      orders: [],
      recipes: seedRecipes
    };
    fs.writeFileSync(localDbPath, JSON.stringify(initialDb, null, 2), 'utf-8');
    console.log('Local JSON Database initialized at:', localDbPath);
  }
};
export const connectDB = async () => {
  // Always initialize local DB structure in case we need it
  initializeLocalDb();
  let mongoUri = process.env.MONGODB_URI;
  if (mongoUri && process.env.user_name && process.env.user_password) {
    const encodedUser = encodeURIComponent(process.env.user_name.trim());
    const encodedPass = encodeURIComponent(process.env.user_password.trim());
    if (mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
      mongoUri = mongoUri
        .replace('<username>', encodedUser)
        .replace('<password>', encodedPass);
    } else {
      mongoUri = mongoUri.replace(
        /^(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/,
        `$1${encodedUser}:${encodedPass}@`
      );
    }
  }
  if (!mongoUri) {
    console.log('⚠️ MONGODB_URI not found. Running in Local JSON Database Mode.');
    isMongoConnected = false;
    return;
  }
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    isMongoConnected = true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️ Falling back to Local JSON Database Mode.');
    isMongoConnected = false;
  }
};