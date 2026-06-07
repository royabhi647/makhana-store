// makhana-store > frontend > src > pages > Home.jsx

import React, { useContext } from 'react';
import FlavorWheel from '../components/FlavorWheel';
import Timeline from '../components/Timeline';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Zap, Flame, Leaf, Heart, ArrowRight } from 'lucide-react';
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
              style={{ width: 'fit-content' }}
            >
              👑 Gourmet Superfood Snack
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('catalog')} 
                className="btn btn-primary" 
                style={{ padding: '16px 36px', fontSize: '1rem' }}
              >
                Explore Flavors 🛍️
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('customizer')} 
                className="btn btn-outline" 
                style={{ padding: '16px 36px', fontSize: '1rem', backgroundColor: 'white' }}
              >
                Mix Your Own Bowl 🥣
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
            style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              <Zap size={28} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>High in Protein</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
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
            style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              <Flame size={28} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>Low Calorie Snacking</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
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
            style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              <Leaf size={28} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>Gluten-Free & Alkaline</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
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
            style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              <Heart size={28} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>Antioxidant Rich</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
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
        backgroundColor: 'var(--secondary)',
        color: 'var(--text-light)',
        padding: '80px 24px',
        overflow: 'hidden'
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
              <Zap size={12} strokeWidth={2.5} />
              Interactive Feature
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
            {/* Visual jar illustration */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{
                width: '200px',
                height: '240px',
                borderRadius: '24px 24px 10px 10px',
                border: '6px solid rgba(255,255,255,0.2)',
                position: 'relative',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '16px',
                overflow: 'hidden'
              }}
            >
              {/* Jar Cap */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '25px',
                width: '138px',
                height: '16px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '8px 8px 0 0'
              }} />
              {/* Colored layered mix fills */}
              <div style={{ height: '35%', width: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px', margin: '2px 0', opacity: 0.9 }} />
              <div style={{ height: '25%', width: '100%', backgroundColor: 'var(--accent)', borderRadius: '4px', margin: '2px 0', opacity: 0.9 }} />
              <div style={{ height: '30%', width: '100%', backgroundColor: '#FFFFFF', borderRadius: '4px', margin: '2px 0', opacity: 0.8 }} />
              <p style={{
                position: 'absolute',
                top: '40%',
                left: 0,
                width: '100%',
                textAlign: 'center',
                color: 'var(--text-dark)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '4px 0',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-title)'
              }}>CUSTOM BLEND</p>
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
