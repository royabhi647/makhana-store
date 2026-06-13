import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
import { Star, ArrowLeft, ShoppingBag, Loader2, Weight } from 'lucide-react';
import { motion } from 'framer-motion';

// Predefined backup products in case API is offline
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
    color: "#F3E5AB",
    image: "/images/product_salted.png"
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
    color: "#FF7F50",
    image: "/images/product_tomato.png"
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
    color: "#E2583E",
    image: "/images/product_peri_peri.png"
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
    color: "#F3E5AB",
    image: "/images/product_cheddar.png"
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
    color: "#C19A6B",
    image: "/images/product_caramel.png"
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
    color: "#E9FFDB",
    image: "/images/product_sour_cream.png"
  }
];

export default function ProductDetails({ productId, navigateTo }) {
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error('API issue');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to local array
        const match = BACKUP_PRODUCTS.find(p => p._id === productId);
        setProduct(match || BACKUP_PRODUCTS[0]);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      if (window.confetti) {
        window.confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      }
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ display: 'inline-block', color: 'var(--primary)' }}
        >
          <Loader2 size={40} />
        </motion.div>
        <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Retrieving specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h3>Product Not Found</h3>
        <button onClick={() => navigateTo('catalog')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Back to catalog link */}
      <button
        onClick={() => navigateTo('catalog')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-title)',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '32px'
        }}
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        alignItems: 'center'
      }}>
        {/* Left column: Visual display */}
        <div style={{
          flex: '1 1 350px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          background: `linear-gradient(135deg, ${product.color}11 0%, ${product.color}33 100%)`,
          borderRadius: 'var(--border-radius-lg)',
          padding: '50px 0',
          minHeight: '380px',
          border: '1px solid var(--border-color)'
        }}>
          {/* Actual Product Image */}
          <img 
            src={product.image || '/images/product_salted.png'} 
            alt={product.name}
            className="animate-float"
            style={{
              width: '240px',
              height: '320px',
              objectFit: 'contain',
              filter: (product.id === 'prod_6' || product._id === 'prod_6') ? 'hue-rotate(120deg)' : 'none',
              transition: 'transform var(--transition-medium)'
            }}
          />
        </div>

        {/* Right column: Content specifications */}
        <div style={{
          flex: '1.5 1 450px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>{product.category} Seasoning</span>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-dark)', marginBottom: '8px', margin: '0 0 8px' }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFB300" stroke="none" />
                ))}
              </div>
              <span style={{ fontWeight: 'bold' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>(100% Customer Satisfaction)</span>
            </div>
          </div>

          <p style={{ color: 'var(--text-dark)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
            {product.description}
          </p>

          {/* Pricing & quantity adding block */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            padding: '20px 0',
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              ${product.price.toFixed(2)}
            </span>
            
            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary" 
              style={{ padding: '14px 36px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Add To Bag
              <ShoppingBag size={18} />
            </button>
          </div>

          {/* Nutritional Profile table */}
          <div className="card glass" style={{ padding: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', marginBottom: '14px', margin: '0 0 14px' }}>
              Nutritional Profile (Per 100g)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', textAlign: 'center' }}>
              <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>Calories</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent)', margin: 0 }}>{product.nutrients.calories} kcal</p>
              </div>
              <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>Protein</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--secondary)', margin: 0 }}>{product.nutrients.protein}g</p>
              </div>
              <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>Carbs</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-dark)', margin: 0 }}>{product.nutrients.carbs}g</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 4px' }}>Dietary Fiber</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-dark)', margin: 0 }}>{product.nutrients.fiber}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
