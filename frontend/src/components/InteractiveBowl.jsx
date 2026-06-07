import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Citrus, Flame, Shapes, Candy, ShoppingCart, Weight, Edit3, Info, Plus, Minus, Maximize2, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
  
  // Custom metadata mapping to actual generated/product images
  const flavorMeta = {
    classic: { 
      name: "Pink Salt Classic", 
      color: "#E8D8C8", 
      calories: 350, 
      protein: 9.2, 
      price: 4.99, 
      icon: Sparkles, 
      image: "/images/flavor_classic.png",
      desc: "Lightly roasted fox nuts dusted with Himalayan pink salt."
    },
    tomato: { 
      name: "Tangy Tomato Herbs", 
      color: "#FF7F50", 
      calories: 365, 
      protein: 8.8, 
      price: 5.49, 
      icon: Citrus, 
      image: "/images/flavor_tomato.png",
      desc: "Coated with sweet sun-dried tomato powder and basil."
    },
    periperi: { 
      name: "Peri-Peri Fire", 
      color: "#E2583E", 
      calories: 370, 
      protein: 9.0, 
      price: 5.99, 
      icon: Flame, 
      image: "/images/product_peri_peri.png",
      desc: "Fiery seasoning of African bird's eye chilies and garlic."
    },
    cheese: { 
      name: "White Cheddar", 
      color: "#F9D976", 
      calories: 385, 
      protein: 10.2, 
      price: 5.99, 
      icon: Shapes, 
      image: "/images/product_cheddar.png",
      desc: "Seasoned with real, premium aged white cheddar cheese."
    },
    caramel: { 
      name: "Butter Caramel", 
      color: "#C19A6B", 
      calories: 410, 
      protein: 7.5, 
      price: 6.49, 
      icon: Candy, 
      image: "/images/product_caramel.png",
      desc: "Glazed with artisanal melted brown sugar and sea salt."
    }
  };

  // Generate 40 particle items inside the bowl with coordinates
  useEffect(() => {
    const list = [];
    const keys = Object.keys(shares);
    for (let i = 0; i < 40; i++) {
      const percentageThreshold = (i / 40) * 100;
      
      let chosenKey = keys[0];
      let tempSum = 0;
      for (let k = 0; k < keys.length; k++) {
        tempSum += shares[keys[k]];
        if (percentageThreshold <= tempSum) {
          chosenKey = keys[k];
          break;
        }
      }
      
      const angle = Math.random() * Math.PI;
      const radius = 15 + Math.random() * 25;
      const x = 50 + radius * Math.cos(angle);
      const y = 45 + radius * Math.sin(angle) * 0.7;
      list.push({
        id: i,
        x: `${x}%`,
        y: `${y}%`,
        color: flavorMeta[chosenKey].color,
        size: 14 + Math.random() * 8
      });
    }
    setParticles(list);
  }, [shares]);

  // Adjust sliders while keeping sum = 100%
  const handleSliderChange = (changedKey, newVal) => {
    const numericVal = Math.max(0, Math.min(100, Number(newVal)));
    const otherKeys = Object.keys(shares).filter(k => k !== changedKey);
    const sumOthers = otherKeys.reduce((acc, k) => acc + shares[k], 0);
    const updated = { ...shares };
    updated[changedKey] = numericVal;
    
    const remaining = 100 - numericVal;
    if (sumOthers === 0) {
      const share = remaining / otherKeys.length;
      otherKeys.forEach(k => {
        updated[k] = Number(share.toFixed(1));
      });
    } else {
      otherKeys.forEach(k => {
        const ratio = shares[k] / sumOthers;
        updated[k] = Number((ratio * remaining).toFixed(1));
      });
    }
    
    const finalSum = Object.values(updated).reduce((acc, v) => acc + v, 0);
    if (finalSum !== 100) {
      const diff = 100 - finalSum;
      updated[otherKeys[0]] = Number((updated[otherKeys[0]] + diff).toFixed(1));
    }
    setShares(updated);
  };

  // Preset operations
  const setPreset = (key, percent) => {
    handleSliderChange(key, percent);
  };

  const resetAll = () => {
    setShares({
      classic: 20,
      tomato: 20,
      periperi: 20,
      cheese: 20,
      caramel: 20
    });
  };

  const packMultiplier = 1.5; // Custom packs are 150g
  const totalCalories = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].calories, 0) * packMultiplier;
  const totalProtein = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].protein, 0) * packMultiplier;
  const totalPrice = Object.keys(shares).reduce((acc, k) => acc + (shares[k] / 100) * flavorMeta[k].price, 0) + 1.00; // Custom pack packaging fee

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
    const baseProduct = {
      _id: mixId,
      name: mixName,
      price: Number(totalPrice.toFixed(2)),
      color: '#C19A6B'
    };
    addToCart(baseProduct, 1, true, customDetails);
    
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    }
    if (onSuccess) onSuccess();
  };

  // Custom click-based progress slider
  const ClickSlider = ({ value, onChange, color }) => {
    const handleBarClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const calculatedPct = Math.round((clickX / rect.width) * 100);
      onChange(calculatedPct);
    };

    return (
      <div 
        onClick={handleBarClick}
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#EAEAE6',
          borderRadius: '5px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          style={{
            height: '100%',
            backgroundColor: color,
            borderRadius: '5px'
          }}
        />
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '40px',
      padding: '24px 0'
    }}>
      {/* Left side: Visual Representation & Health Dash */}
      <div style={{
        flex: '1 1 420px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center'
      }}>
        <div className="card glass" style={{
          width: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Mix Monogram Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="text"
              value={mixName}
              onChange={(e) => setMixName(e.target.value)}
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.6rem',
                fontWeight: 800,
                textAlign: 'center',
                border: 'none',
                borderBottom: '2px dashed var(--primary)',
                backgroundColor: 'transparent',
                color: 'var(--text-dark)',
                outline: 'none',
                padding: '4px 8px',
                maxWidth: '280px'
              }}
              placeholder="Name your mix..."
            />
            <Edit3 size={18} style={{ color: 'var(--primary-dark)' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 24px' }}>Click name above to customize monogram label</p>

          {/* The Bowl Vessel Container */}
          <div style={{
            position: 'relative',
            width: '320px',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            margin: '20px 0 30px'
          }}>
            {/* Ceramic Bowl Backing Shadow */}
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              width: '280px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(74,93,78,0.15)',
              filter: 'blur(8px)',
              zIndex: 1
            }} />

            {/* Ceramic Bowl Body */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '150px',
              borderBottomLeftRadius: '150px',
              borderBottomRightRadius: '150px',
              background: 'linear-gradient(135deg, #FAFAF8 0%, #F3F1EB 100%)',
              border: '8px solid #ECEBE6',
              boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.03), 0 8px 30px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              zIndex: 3
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '85%',
                background: 'radial-gradient(circle at bottom, rgba(232, 216, 200, 0.25) 0%, rgba(255,255,255,0) 80%)'
              }} />
            </div>

            {/* Visual Popped Grains */}
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
                    transform: 'translate(-50%, 50%)'
                  }}
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                >
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: p.color }} />
                </motion.div>
              ))}
            </div>

            {/* Rim highlight */}
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

          {/* Stacked Flavor Distribution Meter */}
          <h4 style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Flavor Ratio Distribution
          </h4>
          <div style={{ display: 'flex', width: '100%', height: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
            {Object.keys(shares).map((key) => {
              const share = shares[key];
              if (share === 0) return null;
              return (
                <motion.div 
                  key={key} 
                  layout
                  style={{
                    width: `${share}%`,
                    backgroundColor: flavorMeta[key].color,
                    height: '100%'
                  }} 
                  title={`${flavorMeta[key].name}: ${share}%`}
                />
              );
            })}
          </div>

          {/* Health Stats Dashboard */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Weight size={14} /> Custom Bag Weight</span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>150g</span>
            </div>
            
            {/* Calories Gauge */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Energy (Calories)</span>
                <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{Math.round(totalCalories)} kcal</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(totalCalories / 650) * 100}%`, backgroundColor: 'var(--accent)', transition: 'width 0.3s' }} />
              </div>
            </div>

            {/* Protein Gauge */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Plant Protein Yield</span>
                <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{totalProtein.toFixed(1)}g</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(totalProtein / 20) * 100}%`, backgroundColor: 'var(--secondary)', transition: 'width 0.3s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Validator Badge Alert */}
        <div className="glass" style={{
          width: '100%',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          backgroundColor: 'rgba(74, 93, 78, 0.05)',
          color: 'var(--primary-dark)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} />
          <span>100% Balanced Blend - Ready to Package</span>
        </div>
      </div>

      {/* Right side: Configurator List */}
      <div style={{
        flex: '1.2 1 500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Controls header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <span className="badge badge-secondary" style={{ marginBottom: '6px' }}>Mixology Hub</span>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', margin: 0 }}>Select Ratios</h3>
          </div>
          <button 
            onClick={resetAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            className="hover-underline"
          >
            <RotateCcw size={12} />
            Equalize Mix
          </button>
        </div>

        {/* Flavor Cards */}
        {Object.keys(shares).map((key) => {
          const meta = flavorMeta[key];
          const val = shares[key];
          const FlavorIcon = meta.icon;

          return (
            <motion.div
              whileHover={{ y: -2, boxShadow: 'var(--shadow-sm)' }}
              key={key}
              className="card glass"
              style={{
                padding: '20px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              {/* Flavor thumbnail photo crop */}
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid white',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img 
                  src={meta.image} 
                  alt={meta.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Slider details controls */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {meta.name}
                      <FlavorIcon size={14} style={{ color: key === 'classic' ? 'var(--primary-dark)' : meta.color }} />
                    </h4>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{meta.desc}</p>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{Math.round(val)}%</span>
                </div>

                {/* Custom click slider */}
                <ClickSlider 
                  value={val} 
                  onChange={(newPct) => handleSliderChange(key, newPct)} 
                  color={meta.color}
                />

                {/* Presets row */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <button 
                    onClick={() => setPreset(key, Math.max(0, val - 10))}
                    style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                  >
                    <Minus size={8} /> 10%
                  </button>
                  <button 
                    onClick={() => setPreset(key, Math.min(100, val + 10))}
                    style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                  >
                    <Plus size={8} /> 10%
                  </button>
                  <button 
                    onClick={() => setPreset(key, 100)}
                    style={{ padding: '4px 10px', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid var(--primary)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                  >
                    <Maximize2 size={8} /> Max Out
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Price and Checkout card details */}
        <div className="card glass" style={{
          padding: '24px 32px',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          backgroundColor: '#FAFAF8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Pack Price (150g)</p>
            <p style={{ margin: '2px 0 0', fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)' }}>${totalPrice.toFixed(2)}</p>
          </div>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary" 
            style={{ 
              padding: '16px 36px', 
              fontSize: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              boxShadow: '0 4px 14px rgba(74, 93, 78, 0.3)' 
            }}
          >
            Add Custom Mix
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}