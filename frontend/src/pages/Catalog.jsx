// makhana-store > frontend > src > pages > Catalog.jsx

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, ShoppingCart, Star, X, Loader2 } from 'lucide-react';
// Default backup products in case API is offline
const BACKUP_PRODUCTS = [
  {
    _id: "prod_1",
    name: "Classic Himalayan Pink Salt Makhana",
    description: "Slow-roasted to crispy perfection and lightly dusted with mineral-rich Himalayan pink salt and a touch of organic olive oil. The perfect clean, guilt-free daily snack.",
    price: 4.99,
    category: "Plain",
    flavor: "Salted",
    stock: 120,
    rating: 4.8,
    nutrients: { calories: 350, protein: 9.2, carbs: 77.0, fat: 1.2, fiber: 14.5 },
    color: "#F3E5AB"
  },
  {
    _id: "prod_2",
    name: "Tangy Tomato Herbs Makhana",
    description: "A delightful blend of sun-dried tomato powder, dynamic Indian spices, and aromatic Italian herbs. It is sweet, sour, and intensely flavorful.",
    price: 5.49,
    category: "Savory",
    flavor: "Tomato",
    stock: 95,
    rating: 4.6,
    nutrients: { calories: 365, protein: 8.8, carbs: 74.0, fat: 3.5, fiber: 13.0 },
    color: "#FF7F50"
  },
  {
    _id: "prod_3",
    name: "Smoked Peri-Peri Fire Makhana",
    description: "For those who love a spicy kick! Coated with a fiery seasoning of African bird's eye chilies, garlic, lemon peel, and smoked paprika.",
    price: 5.99,
    category: "Spicy",
    flavor: "Peri-Peri",
    stock: 80,
    rating: 4.9,
    nutrients: { calories: 370, protein: 9.0, carbs: 72.0, fat: 4.2, fiber: 12.8 },
    color: "#E2583E"
  },
  {
    _id: "prod_4",
    name: "Gourmet White Cheddar Makhana",
    description: "Indulge in the cheesy goodness! Roasted fox nuts seasoned with real, premium aged white cheddar cheese for a smooth, melt-in-your-mouth flavor.",
    price: 5.99,
    category: "Savory",
    flavor: "Cheese",
    stock: 110,
    rating: 4.7,
    nutrients: { calories: 385, protein: 10.2, carbs: 70.0, fat: 5.8, fiber: 11.5 },
    color: "#F3E5AB"
  },
  {
    _id: "prod_5",
    name: "Golden Butter Caramel Makhana",
    description: "A sweet sensation. Glazed with a crispy coating of artisanal melted brown sugar, butter, and a pinch of sea salt. Sweet snacking done right.",
    price: 6.49,
    category: "Sweet",
    flavor: "Caramel",
    stock: 70,
    rating: 4.9,
    nutrients: { calories: 410, protein: 7.5, carbs: 82.0, fat: 6.5, fiber: 10.0 },
    color: "#C19A6B"
  },
  {
    _id: "prod_6",
    name: "Sour Cream & Onion Zest Makhana",
    description: "A classic savory combo. Crispy fox nuts tossed in smooth, tangy sour cream seasoning and garnished with fine chives and wild spring onion flavor.",
    price: 5.49,
    category: "Savory",
    flavor: "Cream-Onion",
    stock: 105,
    rating: 4.5,
    nutrients: { calories: 375, protein: 8.5, carbs: 75.0, fat: 4.0, fiber: 13.2 },
    color: "#E9FFDB"
  }
];
export default function Catalog() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(BACKUP_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('none');
  const [selectedProduct, setSelectedProduct] = useState(null); // Detail modal
  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Using backup seed catalog data.', err);
        setProducts(BACKUP_PRODUCTS);
        setLoading(false);
      });
  }, []);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // Micro celebration trigger
    if (window.confetti) {
      window.confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.8 }
      });
    }
  };
  // Categories
  const categories = ['All', 'Plain', 'Savory', 'Spicy', 'Sweet'];
  // Filter
  const filteredProducts = filter === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === filter.toLowerCase());
  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>Storefront</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Catalog & Pantry</h2>
        <p style={{ color: 'var(--text-muted)' }}>Roasted fresh, packed tightly. Select from our organic flavors.</p>
      </div>
      {/* Control Bar (Filters & Sorting) */}
      <div className="glass" style={{
        padding: '16px 24px',
        borderRadius: 'var(--border-radius-md)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)'
      }}>
        {/* Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                padding: '8px 20px',
                fontSize: '0.85rem',
                backgroundColor: filter === cat ? 'var(--secondary)' : 'transparent',
                color: filter === cat ? 'white' : 'var(--text-dark)',
                border: filter === cat ? 'none' : '1px solid var(--border-color)',
                borderRadius: '20px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-title)' }}>Sort By:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontFamily: 'var(--font-body)',
              outline: 'none',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="none">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ display: 'inline-block', color: 'var(--primary)' }}
          >
            <Loader2 size={40} />
          </motion.div>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Loading premium products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <p>No products found matching your selection.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {sortedProducts.map((p) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              key={p._id} 
              className="card" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              {/* Product Header Graphic */}
              <div style={{
                height: '180px',
                background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}44 100%)`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <span className="badge badge-primary" style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'white',
                  boxShadow: 'var(--shadow-sm)'
                }}>{p.category}</span>
                {/* Actual Product Image */}
                <motion.img 
                  src={p.image || '/images/product_salted.png'} 
                  alt={p.name}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  style={{
                    height: '150px',
                    objectFit: 'contain',
                    filter: (p.id === 'prod_6' || p._id === 'prod_6') ? 'hue-rotate(120deg)' : 'none',
                    transform: 'rotate(-5deg)',
                    transition: 'transform var(--transition-fast)',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                  onClick={() => setSelectedProduct(p)}
                />
              </div>
              {/* Product Details Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '4px' }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <Star size={14} fill="#FFB300" stroke="none" />
                    <span style={{ fontWeight: 600 }}>{p.rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>(Review Pack)</span>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.5',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  flexGrow: 1
                }}>{p.description}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '16px'
                }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>${p.price.toFixed(2)}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="btn btn-outline"
                      style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      Nutrients
                      <BarChart3 size={14} />
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      Add
                      <ShoppingCart size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* Product Detail & Nutritional Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(47, 43, 39, 0.4)',
              backdropFilter: 'blur(6px)',
              zIndex: 2000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 180 }}
              className="card glass" 
              style={{
                backgroundColor: 'var(--bg-card)',
                maxWidth: '560px',
                width: '100%',
                padding: '32px',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  borderRadius: '50%'
                }}
                className="btn-icon"
              >
                <X size={18} />
              </button>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{selectedProduct.category} Flavor</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '12px' }}>{selectedProduct.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                {selectedProduct.description}
              </p>
              <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Nutritional Facts (Per 100g)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Calories</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedProduct.nutrients.calories} kcal</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Protein</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedProduct.nutrients.protein}g</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Carbohydrates</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedProduct.nutrients.carbs}g</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dietary Fiber</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedProduct.nutrients.fiber}g</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Fat</span>
                  <span style={{ fontWeight: 'bold' }}>{selectedProduct.nutrients.fat}g</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)' }}>${selectedProduct.price.toFixed(2)}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Add to Cart
                  <ShoppingCart size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .packet-hover:hover {
          transform: rotate(0deg) scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}

