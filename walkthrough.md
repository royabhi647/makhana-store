# MERN Stack Makhana Store - Walkthrough

The codebase for **Makhana Bliss**—a premium, highly interactive, and responsive web application in the MERN stack—has been fully written to the directory:
`C:\Users\Abhishek\.gemini\antigravity\scratch\makhana-store`

---

## 📂 Deliverables & Folder Structure

Here is a summary of the files created:

### 1. Backend Server (`/backend`)
- [server.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/server.js): Entry point connecting middleware (CORS, Express JSON), routes, database initializer, and error handler.
- [db.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/config/db.js): High-resiliency database connector. Automatically boots in **Local JSON mode** (creating `data/db.json`) if MongoDB environment keys are missing, falling back to local files without breaking the application logic.
- [dbService.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/models/dbService.js): Unified data manipulation service encapsulating both standard MongoDB Mongoose queries and matching JSON-file manipulation methods.
- [schemas.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/models/schemas.js): Mongoose schemas and models for `User`, `Product`, `Order`, and `Recipe`.
- [authMiddleware.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/middleware/authMiddleware.js): Middleware validating JWT headers and checking user roles.
- [errorMiddleware.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/middleware/errorMiddleware.js): Custom 404 handler and global exception logger.
- [controllers/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/controllers): Express controllers managing auth token issue, product lists, order settlement, and cooking recipes.
- [routes/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/routes): Restful routes linking controllers to URI endpoints.
- [data/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/data): Database seed folders containing original products and recipes.
- [.env](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/.env) & [package.json](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/package.json): Config and dependencies list (Express, BCrypt, JWT, Mongoose).

### 2. React Vite Client (`/frontend`)
- [package.json](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/package.json) & [vite.config.js](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/vite.config.js): Configurations setting up local client port `3000` and proxy redirection of `/api` requests to backend port `5000`.
- [index.html](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/index.html): HTML wrapper downloading Outfit & Inter google fonts.
- [index.css](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/src/index.css): Premium design system styled with custom properties, earthy-gold branding, custom flip animations, and media breakpoints.
- [App.jsx](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/src/App.jsx): Entry file loading contexts and custom hash-based URL routing (making the SPA lightweight and bookmarkable).
- [context/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/src/context): AuthContext (managing signup, login states, localStorage syncing) and CartContext (quantity modifications, pricing calculators, custom mix additions).
- [components/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/src/components):
  - `Navbar` & `Footer`: Responsive navigation layout featuring mobile drawer toggle and a dark mode activation switch.
  - `Timeline`: Scroll-based harvesting progression chart with custom vector diagrams.
  - `FlavorWheel`: Premium flavor selector rotating cards, theme gradients, and packaging graphics.
  - `InteractiveBowl`: The **WOW Customizer** tool where dragging sliders shifts percentage dots inside a virtual ceramic bowl, computing prices and nutrients on-the-fly.
- [pages/](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/frontend/src/pages):
  - `Home`: Collage hero section, nutrient grids, and customer reviews.
  - `Catalog`: Item panels filtering categories (Spicy, Sweet, Savory, Plain) and sorting prices.
  - `Recipes`: Scalable guide. Adjusting serving sizes dynamically recalculates raw weights of ingredients in real-time.
  - `Cart` & `Checkout`: Responsive basket summary and a secure step-by-step payment submission page (popping confetti on completion).
  - `Profile`: Logged-out forms and user order histories tracking states.
  - `AdminDashboard`: Admin workspace featuring product registers, delivery triggers, and sales revenue bar graphs.

---

## 🚀 Step-by-Step Running Guide

Since Node and npm are missing from the system environment paths, follow these quick steps on your terminal to launch the application:

### Step 1: Initialize Workspace
We recommend setting the parent directory as your active workspace:
`C:\Users\Abhishek\.gemini\antigravity\scratch\makhana-store`

### Step 2: Set Up Backend Database (Optional)
By default, the backend will initialize locally inside `data/db.json` and work out-of-the-box. If you want to connect to a real MongoDB database:
1. Open [backend/.env](file:///C:/Users/Abhishek/.gemini/antigravity/scratch/makhana-store/backend/.env)
2. Add your MongoDB connection string:
   `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/makhana`

### Step 3: Run the Backend Server
Open a terminal window and run:
```bash
cd backend
npm install
npm run dev
```
*The server will boot on port `5000` (e.g. `http://localhost:5000/api/health` will return a status check).*

### Step 4: Run the React Client
Open a second terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
*The development server will boot on port `3000` (e.g. `http://localhost:3000`).*

---

## 🔑 Demonstration Accounts

For testing, we have preloaded the databases with seed details. You can log in using:

1. **Administrator Account**:
   - Email: `admin@makhana.com`
   - Password: `admin123`
   - *Gives access to the Admin Console to register products and ship orders.*

2. **Customer Account**:
   - Email: `user@makhana.com`
   - Password: `user123`
   - *Gives access to custom order tracking lists.*

---

## 💬 WhatsApp Order Booking Integration

We have implemented a highly interactive and premium WhatsApp Order Booking feature:

### 1. Dynamic Component
- [WhatsAppFloatingButton.jsx](file:///Users/abhishekkumar/makhana-store/frontend/src/components/WhatsAppFloatingButton.jsx): A new React component that dynamically builds order templates based on active cart states and user login sessions.
  - **Dynamic Cart-aware Template**: When the cart contains items, it formats a detailed outline with item names, custom mix flavor percentages, individual sub-prices, shipping terms, and the exact grand total.
  - **General Enquiry Template**: If the cart is empty, it formats a clean outline of all available flavors for quick selection and blank details fields.
  - **Real-time Pricing Badge**: The tooltip badge updates dynamically with the total cart price (e.g., `Book Order ($34.96) 💬`) to make checkout highly visual.

### 2. Styling & Motion Polish
- [index.css](file:///Users/abhishekkumar/makhana-store/frontend/src/index.css): Added a pulsing glowing green aura animation (`whatsappPulse`) that loops continuously. On hover, the pulsing pauses and transitions smoothly into a larger glowing drop-shadow.
- **Mobile responsiveness**: Added media breakpoint overrides to hide the tooltip text badge on mobile screen widths to prevent UI clutter while maintaining full clickability.

### 3. Context Integration
- Refactored [App.jsx](file:///Users/abhishekkumar/makhana-store/frontend/src/App.jsx) to clean up old hardcoded static href links and render `<WhatsAppFloatingButton />` as a child of the `CartProvider` and `AuthProvider`.

