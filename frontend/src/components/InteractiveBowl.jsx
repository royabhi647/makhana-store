import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
export default function InteractiveBowl({ onSuccess }) {
  const { addToCart } = useContext(CartContext);
  const [mixName, setMixName] = useState("My Daily Power Mix");
  // Flavor selections (initial values summing to 100)
  const [shares, setShares] = useState({
    classic: 40,
    tomato: 20,
    periperi: 0,
    cheese: 20,
    caramel: 20
  });
  const [particles, setParticles] = useState([]);
  const flavorMeta = {
    classic: { name: "Pink Salt Classic", color: "#E8D8C8", calories: 350, protein: 9.2, price: 4.99, emoji: "🧂" },
    tomato: { name: "Tangy Tomato Herbs", color: "#FF7F50", calories: 365, protein: 8.8, price: 5.49, emoji: "🍅" },
    periperi: { name: "Peri-Peri Fire", color: "#E2583E", calories: 370, protein: 9.0, price: 5.99, emoji: "🔥" },
    cheese: { name: "White Cheddar", color: "#F9D976", calories: 385, protein: 10.2, price: 5.99, emoji: "🧀" },
    caramel: { name: "Butter Caramel", color: "#C19A6B", calories: 410, protein: 7.5, price: 6.49, emoji: "🍯" }
  };
  // Generate 40 particle items inside the bowl with coordinates
  useEffect(() => {
    const list = [];
    const keys = Object.keys(shares);
    let currentKeyIdx = 0;
    let runningSum = 0;
    // We want 40 grains total
    for (let i = 0; i < 40; i++) {
      const percentageThreshold = (i / 40) * 100;
      
      // Find which flavor category this grain belongs to
      let chosenKey = keys[0];
      let tempSum = 0;
      for (let k = 0; k < keys.length; k++) {
        tempSum += shares[keys[k]];
        if (percentageThreshold <= tempSum) {
          chosenKey = keys[k];
          break;
        }
      }
      // Random placement coordinates inside a circular bowl arc
      // Semi-circular layout: x from 15% to 85%, y from 35% to 85%
      const angle = Math.random() * Math.PI; // 0 to 180 degrees
      const radius = 15 + Math.random() * 25; // radius distance
      const x = 50 + radius * Math.cos(angle);
      const y = 45 + radius * Math.sin(angle) * 0.7; // flatten the circle slightly
      list.push({
        id: i,
        x: `${x}%`,
        y: `${y}%`,
        color: flavorMeta[chosenKey].color,
        emoji: flavorMeta[chosenKey].emoji,
        size: 14 + Math.random() * 8
      });
    }
    setParticles(list);
  }, [shares]);
  // Adjust sliders while keeping sum = 100%
  const handleSliderChange = (changedKey, newVal) => {
    const numericVal = Number(newVal);
    const otherKeys = Object.keys(shares).filter(k => k !== changedKey);
    const sumOthers = otherKeys.reduce((acc, k) => acc + shares[k], 0);
    const updated = { ...shares };
    updated[changedKey] = numericVal;
    // Remaining share to distribute among others
    const remaining = 100 - numericVal;
    if (sumOthers === 0) {
      // If others are all 0, distribute equally
      const share = remaining / otherKeys.length;
      otherKeys.forEach(k => {
        updated[k] = Number(share.toFixed(1));
      });
    } else {
      // Distribute proportionally
      otherKeys.forEach(k => {
        const ratio = shares[k] / sumOthers;
        updated[k] = Number((ratio * remaining).toFixed(1));
      });
    }
    // Clean up rounding errors to strictly sum to 100
    const finalSum = Object.values(updated).reduce((acc, v) => acc + v, 0);
    if (finalSum !== 100) {
      const diff = 100 - finalSum;
      updated[otherKeys[0]] = Number((updated[otherKeys[0]] + diff).toFixed(1));
    }
    setShares(updated);
  };
  // Calculations (weighted average per 100g, scaled to 150g custom pack)
  const packMultiplier = 1.5; // Custom packs are 150g
  const totalCalories = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].calories, 0) * packMultiplier;
  const totalProtein = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].protein, 0) * packMultiplier;
  const totalPrice = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].price, 0) + 1.00; // $1.00 custom packaging premium
  const handleAddToCart = () => {
    if (!mixName.trim()) {
      alert("Please give your custom mix a name!");
      return;
    }
    const mixId = "custom_" + Date.now();
    const customDetails = {
      mixId,
      name: mixName,
      shares: { ...shares },
      price: Number(totalPrice.toFixed(2)),
      nutrients: {
        calories: Math.round(totalCalories),
        protein: Number(totalProtein.toFixed(1))
      }
    };
    // Represent custom product as a virtual item
    const baseProduct = {
      _id: mixId,
      name: mixName,
      price: Number(totalPrice.toFixed(2)),
      color: '#C19A6B'
    };
    addToCart(baseProduct, 1, true, customDetails);
    // Call celebration trigger if canvas-confetti is loaded, or simple alert
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
    
    if (onSuccess) {
      onSuccess();
    }
  };
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '40px',
      padding: '24px 0'
    }}>
      {/* Left side: Visual representation of the bowl */}
      <div style={{
        flex: '1 1 400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <input
            type="text"
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.5rem',
              fontWeight: 800,
              textAlign: 'center',
              border: 'none',
              borderBottom: '2px dashed var(--primary)',
              backgroundColor: 'transparent',
              color: 'var(--text-dark)',
              outline: 'none',
              padding: '4px 8px',
              maxWidth: '300px'
            }}
            placeholder="Name your mix..."
          />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>✏️ Click name to edit</p>
        </div>
        {/* The Bowl Vessel Container */}
        <div style={{
          position: 'relative',
          width: '320px',
          height: '220px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          margin: '20px 0'
        }}>
          {/* Ceramic Bowl Backing Shadow */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            width: '280px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.06)',
            filter: 'blur(6px)',
            zIndex: 1
          }} />
          {/* Ceramic Bowl Body */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '150px',
            borderBottomLeftRadius: '150px',
            borderBottomRightRadius: '150px',
            backgroundColor: '#FAFAF8',
            border: '8px solid #ECEBE6',
            boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.03), var(--shadow-md)',
            overflow: 'hidden',
            zIndex: 3
          }}>
            {/* Liquid/Grain layer background inside bowl */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '85%',
              background: 'rgba(0,0,0,0.02)',
              borderTop: '2px solid rgba(0,0,0,0.05)'
            }} />
          </div>
          {/* Visual Popped Grains (Inside / Floating) */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '140px',
            bottom: '8px',
            overflow: 'hidden',
            zIndex: 4
          }}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ scale: 0.2, y: -30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                style={{
                  position: 'absolute',
                  left: p.x,
                  bottom: `calc(${p.y} - 10px)`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: `3px solid ${p.color}`,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px',
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.4)',
                  transform: 'translate(-50%, 50%)',
                  padding: '2px'
                }}
                whileHover={{ scale: 1.3, zIndex: 10 }}
              >
                <span style={{ fontSize: '0.5rem' }}>{p.emoji}</span>
              </motion.div>
            ))}
          </div>
          {/* Circular Rim Highlights */}
          <div style={{
            position: 'absolute',
            bottom: '142px',
            width: '286px',
            height: '24px',
            borderRadius: '50%',
            border: '4px solid #ECEBE6',
            backgroundColor: 'transparent',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        </div>
        {/* Nutritional facts card */}
        <div className="glass" style={{
          padding: '16px 24px',
          borderRadius: 'var(--border-radius-md)',
          width: '100%',
          maxWidth: '320px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginTop: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Weight</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>150g</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Calories</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent)' }}>{Math.round(totalCalories)}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Protein</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{totalProtein.toFixed(1)}g</p>
          </div>
        </div>
      </div>
      {/* Right side: Sliders for flavor percentages */}
      <div className="card" style={{
        flex: '1 2 450px',
        padding: '32px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div>
          <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>Mixology Workshop</span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-dark)' }}>Configure Your Flavors</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Slide the bars to adjust proportions. The app will automatically distribute percentages to maintain a perfect 100% batch.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.keys(shares).map((key) => {
            const meta = flavorMeta[key];
            const val = shares[key];
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>{meta.emoji}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{meta.name}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--primary-dark)' }}>{Math.round(val)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => handleSliderChange(key, e.target.value)}
                  style={{
                    width: '100%',
                    accentColor: meta.color === '#E8D8C8' ? 'var(--primary)' : meta.color,
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Pricing and Action footer */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Custom Pack Price</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>${totalPrice.toFixed(2)}</p>
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary" style={{ padding: '14px 36px' }}>
            Add Custom Mix 🛒
          </button>
        </div>
      </div>
    </div>
  );
}