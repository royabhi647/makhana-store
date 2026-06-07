// makhana-store > frontend > src > pages > Home.jsx

import React, { useContext } from 'react';
import FlavorWheel from '../components/FlavorWheel';
import Timeline from '../components/Timeline';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Zap, Leaf, ArrowRight, Dumbbell, HeartPulse, ShieldAlert, Crown, ShoppingBag, Sparkles } from 'lucide-react';
export default function Home({ navigateTo }) {
  const { addToCart } = useContext(CartContext);
  const handleQuickAdd = (flavor) => {
    // Maps standard catalog item properties
    const product = {
      _id: flavor.id,
      name: flavor.name,
      price: flavor.price,
      color: flavor.packColor || '#C19A6B',
      stock: 100
    };
    addToCart(product, 1);
    if (window.confetti) {
      window.confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(rgba(249, 246, 240, 0.88), rgba(239, 235, 228, 0.88)), url("/images/hero_bg.png") center/cover no-repeat',
          padding: '100px 24px 120px',
          borderBottom: '1px solid var(--border-color)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Floating background decorative shape */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)',
          opacity: 0.3,
          zIndex: 1,
          pointerEvents: 'none'
        }} />
        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Hero text content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <motion.span 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
              className="badge badge-secondary" 
              style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Crown size={14} style={{ color: 'var(--secondary-dark)' }} /> Gourmet Superfood Snack
            </motion.span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-title)',
              color: 'var(--text-dark)',
              lineHeight: '1.15',
              letterSpacing: '-1px'
            }}>
              Savor the Crisp, <br />
              Embrace the <span style={{ color: 'var(--primary-dark)' }}>Health.</span>
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              maxWidth: '540px'
            }}>
              Experience premium grade, hand-harvested lotus seeds. Slow-roasted in rich olive oil and coated with natural gourmet spices. Low calorie, high protein, and 100% gluten-free.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px', alignItems: 'center' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('catalog')} 
                className="btn btn-primary" 
                style={{ padding: '16px 36px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Explore Flavors
                <ShoppingBag size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('customizer')} 
                className="btn btn-outline" 
                style={{ padding: '16px 36px', fontSize: '1rem', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Mix Your Own Bowl
                <Sparkles size={18} style={{ color: 'var(--primary)' }} />
              </motion.button>
            </div>
          </motion.div>
          {/* Hero Visual Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              flex: '1 1 400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              style={{
                width: '100%',
                maxWidth: '440px',
                height: '360px',
                borderRadius: '24px',
                border: '4px solid white',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <img 
                src="/images/hero_banner.png" 
                alt="Premium Gourmet Popped Makhana" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.header>
      {/* Why Makhana (Health Benefits) */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Pure Nutrition</span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Why Choose Makhana?</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 0' }}>
            Fox nuts (lotus seeds) are ancient Ayurvedic superfoods that combine high nutritional potency with light, crunchy snacking delight.
          </p>
        </div>
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--primary)' }}
            className="card" 
            style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#FAFAF8' }}>
              <img 
                src="/images/benefit_protein.png" 
                alt="High in Protein" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>High in Protein</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Contains significant plant-based protein (about 9.5g per 100g) which helps repair cells and boosts muscle growth.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--primary)' }}
            className="card" 
            style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#FAFAF8' }}>
              <img 
                src="/images/benefit_low_calorie.png" 
                alt="Low Calorie Snacking" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>Low Calorie Snacking</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Extremely low in calories and saturated fats. A single bowl satisfies hunger without adding heavy calorie loads.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--primary)' }}
            className="card" 
            style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#FAFAF8' }}>
              <img 
                src="/images/benefit_gluten_free.png" 
                alt="Gluten-Free & Alkaline" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>Gluten-Free & Alkaline</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Naturally gluten-free and highly alkaline, making it gentle on the stomach and supporting healthy gut digestion.
            </p>
          </motion.div>
          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--primary)' }}
            className="card" 
            style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', overflow: 'hidden' }}
          >
            <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#FAFAF8' }}>
              <img 
                src="/images/benefit_antioxidants.png" 
                alt="Antioxidant Rich" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>Antioxidant Rich</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Loaded with flavonoids (like kaempferol) which fight free radicals, reduce inflammation, and possess anti-aging properties.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Flavor Showcase Widget */}
      <section className="container">
        <FlavorWheel navigateTo={navigateTo} onQuickAdd={handleQuickAdd} />
      </section>
      {/* Custom Mix Banner Section */}
      <section style={{
        background: 'linear-gradient(rgba(44, 58, 47, 0.94), rgba(44, 58, 47, 0.90)), url("/images/hero_bg.png") center/cover no-repeat',
        color: 'var(--text-light)',
        padding: '100px 24px',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px'
        }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', width: 'fit-content', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={12} strokeWidth={2.5} style={{ color: 'var(--primary)' }} />
              Interactive Blender
            </span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontFamily: 'var(--font-title)' }}>
              Create Your Signature Bowl
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '580px' }}>
              Don't want to settle for just one flavor? Use our interactive blender! Mix Classic, Cheddar, Peri-Peri, and Caramel in any ratio. Name your creation, see live nutritional readouts, and order a custom-packaged jar.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('customizer')} 
              className="btn btn-primary" 
              style={{ width: 'fit-content', padding: '14px 32px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Open Mix Customizer
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              flex: '1 1 350px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              style={{
                width: '100%',
                maxWidth: '320px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '16px',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{
                width: '100%',
                height: '220px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src="/images/timeline_seasoning.png" 
                  alt="Custom Signature Bowl" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <span className="badge badge-accent" style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  Your Mix
                </span>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 700 }}>
                  Signature Crunch Bowl
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                  A balanced blend of classic seasoning, cheddar cheese, and a dash of spice.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Harvesting Timeline Journey */}
      <section className="container">
        <Timeline />
      </section>
      {/* Testimonials */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>Reviews</span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Loved By Snacking Enthusiasts</h2>
        </div>
        <div className="grid" style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
            className="card glass" 
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', color: 'var(--primary)', fontSize: '1.25rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              "The custom mix feature is mind-blowing! I combined 60% White Cheddar with 40% Peri-Peri. The balance is fantastic, and the grains stayed completely crunchy during shipping. Five stars!"
            </p>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>Rohan K.</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Buyer</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
            className="card glass" 
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', color: 'var(--primary)', fontSize: '1.25rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              "I have been eating Makhana for years, but the Himalayan Pink Salt variant here is outstanding. You can tell they use genuine olive oil. It is very clean, light, and healthy."
            </p>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>Ananya S.</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fitness Coach</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
            className="card glass" 
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', color: 'var(--primary)', fontSize: '1.25rem' }}>★★★★★</div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              "The recipes page is wonderful. I cooked the Makhana Kheer using their scale calculator for 6 people and it came out perfectly creamy. Ordering was super fast as well."
            </p>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>David L.</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Home Cook</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
