import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Sun, Flame, Search, Award } from 'lucide-react';

const renderStepIcon = (index) => {
  const styles = { verticalAlign: 'middle', marginRight: '8px', color: 'var(--primary-dark)', display: 'inline-block' };
  switch (index) {
    case 0:
      return <Sprout size={24} style={styles} />;
    case 1:
      return <Sun size={24} style={styles} />;
    case 2:
      return <Flame size={24} style={styles} />;
    case 3:
      return <Search size={24} style={styles} />;
    case 4:
      return <Award size={24} style={styles} />;
    default:
      return null;
  }
};

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "1. Mud Lotus Harvesting",
      subtitle: "Harvested from the deep muck",
      description: "Skilled farmers harvest the raw black seeds of the Euryale ferox (Lotus) plant from the muddy beds of fresh-water wetlands and ponds in Bihar, India.",
      emoji: "🌾",
      image: "/images/timeline_harvest.png"
    },
    {
      title: "2. Sun Washing & Drying",
      subtitle: "Cleansed by water, dried by air",
      description: "Harvested seeds are thoroughly washed in nets to clear away silt and debris, then spread out on wide bamboo mats under the warm golden sun to dry naturally.",
      emoji: "☀️",
      image: "/images/timeline_washing.png"
    },
    {
      title: "3. Heat Roasting & Popping",
      subtitle: "The explosive transformation",
      description: "Dried seeds are roasted in heavy iron pans. At the peak temperature, they are struck with wooden mallets, cracking the hard shell to pop open the fluffy white kernel.",
      emoji: "🔥",
      image: "/images/timeline_roasting.png"
    },
    {
      title: "4. Grading & Sorting",
      subtitle: "Only the biggest and fluffiest",
      description: "The popped kernels are carefully sorted through sieves to grade them. Large, premium round kernels are classified as 'Phool' (flower) quality.",
      emoji: "🔍",
      image: "/images/timeline_grading.png"
    },
    {
      title: "5. Olive Roasting & Seasoning",
      subtitle: "Crafted into tasty snacks",
      description: "Finally, the premium graded makhana is slow-roasted in cold-pressed olive oil and tossed with gourmet spices and seasonings before air-tight sealing.",
      emoji: "🧂",
      image: "/images/timeline_seasoning.png"
    }
  ];

  return (
    <div style={{
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>Interactive Journey</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '16px' }}>From Pond to Packet</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore the artisanal processing of Makhana seeds. Each seed is hand-harvested and flame-popped using centuries-old traditional methods.
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Left Side: Step Details (Dynamic Card) */}
        <div className="card glass" style={{
          flex: '1 1 400px',
          padding: '32px',
          borderRadius: 'var(--border-radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: 'var(--shadow-md)',
          minHeight: '380px',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              {/* Photo Display */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '4px solid white',
                  boxShadow: 'var(--shadow-md)',
                  flexShrink: 0,
                  margin: '0 auto'
                }}
              >
                <img 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </motion.div>

              {/* Text Description */}
              <div style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  {renderStepIcon(activeStep)}
                  <span style={{
                    fontFamily: 'var(--font-title)',
                    color: 'var(--primary-dark)',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>Active Step</span>
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  margin: '4px 0 8px',
                  color: 'var(--text-dark)'
                }}>{steps[activeStep].title}</h3>
                <h4 style={{
                  color: 'var(--secondary)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}>{steps[activeStep].subtitle}</h4>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                }}>{steps[activeStep].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Step Navigation Buttons */}
        <div style={{
          flex: '1 1 400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative'
        }}>
          {/* Vertical Progress Line */}
          <div style={{
            position: 'absolute',
            left: '26px',
            top: '20px',
            bottom: '20px',
            width: '4px',
            backgroundColor: 'var(--border-color)',
            zIndex: 1
          }}>
            <motion.div 
              animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                width: '100%',
                backgroundColor: 'var(--primary)',
                height: '0%'
              }} 
            />
          </div>

          {/* Steps list */}
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveStep(idx)}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  zIndex: 2,
                  padding: '8px 12px',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isActive ? 'var(--border-color)' : 'transparent',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Connector Node */}
                <motion.div 
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isActive ? 'var(--primary)' : (isCompleted ? 'var(--secondary)' : 'var(--border-color)')
                  }}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    boxShadow: isActive ? '0 0 0 6px var(--primary-light)' : 'none'
                  }}
                >
                  {isCompleted ? '✓' : idx + 1}
                </motion.div>
                
                {/* Step Metadata */}
                <div>
                  <h4 style={{
                    fontSize: '0.95rem',
                    color: isActive ? 'var(--text-dark)' : 'var(--text-muted)',
                    fontWeight: isActive ? 'bold' : '500',
                    transition: 'color var(--transition-fast)'
                  }}>{step.title}</h4>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    opacity: isActive ? 1 : 0.7
                  }}>{step.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}