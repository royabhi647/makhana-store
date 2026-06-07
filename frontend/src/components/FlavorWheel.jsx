import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const renderFlavorIcon = (index) => {
  const styles = { width: '18px', height: '18px', color: 'white', display: 'block' };
  switch (index) {
    case 0: // Salt Shaker
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles}>
          <path d="M6 20h12M6 16h12M12 4v4M10 8h4M8 8v8a4 4 0 0 0 8 0V8H8Z"/>
        </svg>
      );
    case 1: // Tomato
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles}>
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3v3M10 5l4 2M8 4l2 1.5"/>
        </svg>
      );
    case 2: // Fire/Flame (Peri Peri)
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        </svg>
      );
    case 3: // Cheese (Cheddar)
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles}>
          <path d="M3 22h18v-7L3 8v14Z"/>
          <circle cx="7" cy="17" r="1"/>
          <circle cx="12" cy="15" r="1"/>
          <circle cx="17" cy="18" r="1.5"/>
        </svg>
      );
    case 4: // Caramel
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
    default:
      return null;
  }
};
export default function FlavorWheel({ navigateTo, onQuickAdd }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const flavors = [
    {
      name: "Classic Pink Salt",
      description: "Simple, light, and crunchy. Lightly popped kernels tossed in pure olive oil and dusted with mineral-rich Himalayan pink salt.",
      price: 4.99,
      rating: "⭐ 4.8 (120 reviews)",
      color: "#F4EAD4", // Warm cream
      textColor: "#5D4037",
      bgGradient: "linear-gradient(135deg, #FFF8EC 0%, #F5E6CC 100%)",
      badge: "Pure & Organic",
      id: "prod_1",
      nutrients: "Protein: 9.2g | Calories: 350 kcal | Fiber: 14.5g",
      packColor: "#EAD6B5",
      image: "/images/product_salted.png"
    },
    {
      name: "Tangy Tomato Herbs",
      description: "A zesty explosion of dried sun-ripened tomatoes, sweet basil, garlic, and wild red onion flakes. Tangy goodness in every bite.",
      price: 5.49,
      rating: "⭐ 4.6 (95 reviews)",
      color: "#FCEBE7", // Coral blush
      textColor: "#D84315",
      bgGradient: "linear-gradient(135deg, #FFF3F0 0%, #FAD9D2 100%)",
      badge: "Zesty & Bold",
      id: "prod_2",
      nutrients: "Protein: 8.8g | Calories: 365 kcal | Fiber: 13.0g",
      packColor: "#E07C67",
      image: "/images/product_tomato.png"
    },
    {
      name: "Smoked Peri-Peri Fire",
      description: "Coated with a blistering rub of African bird's eye chilies, smoky Spanish paprika, and a spritz of lime. Spicy snacking redefined.",
      price: 5.99,
      rating: "⭐ 4.9 (80 reviews)",
      color: "#FDF0EE", // Light flame red
      textColor: "#C62828",
      bgGradient: "linear-gradient(135deg, #FFF2F0 0%, #F8DCD8 100%)",
      badge: "Spicy Hot",
      id: "prod_3",
      nutrients: "Protein: 9.0g | Calories: 370 kcal | Fiber: 12.8g",
      packColor: "#C62828",
      image: "/images/product_peri_peri.png"
    },
    {
      name: "Gourmet White Cheddar",
      description: "A smooth, cheesy treat roasted with organic white cheddar cheese powder. It melts in your mouth with a savory, buttery texture.",
      price: 5.99,
      rating: "⭐ 4.7 (110 reviews)",
      color: "#FEF9E7", // Light cheddar yellow
      textColor: "#F57F17",
      bgGradient: "linear-gradient(135deg, #FFFDF0 0%, #FAF0CD 100%)",
      badge: "Creamy Cheese",
      id: "prod_4",
      nutrients: "Protein: 10.2g | Calories: 385 kcal | Fiber: 11.5g",
      packColor: "#E5C158",
      image: "/images/product_cheddar.png"
    },
    {
      name: "Golden Butter Caramel",
      description: "A sweet kettle-style delight. Glazed with a crispy shell of melted brown sugar, real butter, and a pinch of marine sea salt.",
      price: 6.49,
      rating: "⭐ 4.9 (70 reviews)",
      color: "#FAF2EA", // Light caramel brown
      textColor: "#6D4C41",
      bgGradient: "linear-gradient(135deg, #FFF7F0 0%, #EFE1D2 100%)",
      badge: "Sweet Glazed",
      id: "prod_5",
      nutrients: "Protein: 7.5g | Calories: 410 kcal | Fiber: 10.0g",
      packColor: "#B59270",
      image: "/images/product_caramel.png"
    }
  ];
  const current = flavors[activeIdx];
  const handleSelect = (idx) => {
    setActiveIdx(idx);
  };
  return (
    <div style={{
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Flavor Explorer</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '16px' }}>Discover the Crunch</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore our range of premium slow-roasted flavors. Click on a flavor to reveal its ingredients, price, and nutritional profile.
        </p>
      </div>
      {/* Main Showcase Panel */}
      <motion.div 
        animate={{ background: current.bgGradient }}
        transition={{ duration: 0.5 }}
        className="card" 
        style={{
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
          >
            {/* Left Side: Dynamic Graphics */}
            <div style={{
              flex: '1 1 350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              position: 'relative',
              minHeight: '320px',
              overflow: 'hidden'
            }}>
              {/* Animated Spinning Background Rings */}
              <div style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                border: '2px dashed rgba(0,0,0,0.06)',
                borderRadius: '50%',
                animation: 'spinSlow 30s linear infinite',
                zIndex: 1
              }} />
              {/* Actual Product Image */}
              <motion.img 
                src={current.image || '/images/product_salted.png'} 
                alt={current.name}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  width: '180px',
                  height: '270px',
                  objectFit: 'contain',
                  zIndex: 2,
                  filter: current.id === 'prod_6' ? 'hue-rotate(120deg)' : 'none',
                  position: 'relative'
                }}
              />
              {/* Floating popped makhana grains */}
              <motion.div 
                animate={{ y: [0, -6, 0], rotate: [15, 20, 15] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: '2px solid var(--border-color)',
                  top: '40px',
                  right: '50px',
                  boxShadow: 'var(--shadow-sm)',
                  zIndex: 1
                }} 
              />
              <motion.div 
                animate={{ y: [0, 6, 0], rotate: [-25, -20, -25] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: '2px solid var(--border-color)',
                  bottom: '40px',
                  left: '50px',
                  boxShadow: 'var(--shadow-sm)',
                  zIndex: 1
                }} 
              />
            </div>
            {/* Right Side: Copy & Selection Panel */}
            <div style={{
              flex: '1 2 450px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <div>
                <span className="badge" style={{ backgroundColor: 'white', color: current.textColor, fontWeight: '700' }}>
                  {current.badge}
                </span>
                <h3 style={{
                  fontSize: '2rem',
                  color: 'var(--text-dark)',
                  marginTop: '10px',
                  fontFamily: 'var(--font-title)'
                }}>{current.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 12px' }}>{current.rating}</p>
                <p style={{
                  color: 'var(--text-dark)',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  minHeight: '80px'
                }}>{current.description}</p>
              </div>
              {/* Nutrient summary bar */}
              <div className="glass" style={{
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-muted)'
              }}>
                {current.nutrients}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--text-dark)' }}>
                  ${current.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onQuickAdd(current)}
                  className="btn"
                  style={{
                    backgroundColor: current.textColor,
                    color: '#FFF',
                    padding: '12px 32px'
                  }}
                >
                  Quick Add +
                </motion.button>
                <button
                  onClick={() => navigateTo('catalog')}
                  className="btn btn-outline"
                  style={{ padding: '12px 24px' }}
                >
                  Shop All
                </button>
              </div>
              {/* Selection Dots */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '20px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                paddingTop: '20px'
              }}>
                {flavors.map((flv, idx) => (
                  <motion.button
                    key={flv.name}
                    onClick={() => handleSelect(idx)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: flv.packColor,
                      border: activeIdx === idx ? '3px solid white' : '1px solid rgba(0,0,0,0.1)',
                      boxShadow: activeIdx === idx ? '0 0 0 3px ' + flv.packColor : 'none',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={flv.name}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderFlavorIcon(idx)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}