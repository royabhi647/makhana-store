// makhana-store > frontend > src > pages > Recipes.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BACKUP_RECIPES = [
  {
    _id: "rec_1",
    name: "Royal Creamy Makhana Kheer",
    description: "A luxurious and healthy twist to the traditional Indian rice pudding. Made with slow-reduced low-fat milk, roasted ground makhana, saffron, cardamom, and garnished with pistachios.",
    prepTime: "10 mins",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    image: "/images/timeline_seasoning.png",
    ingredients: [
      { name: "Roasted Makhana (Fox Nuts)", amount: 50, unit: "g" },
      { name: "Milk (or Almond Milk for vegan)", amount: 1, unit: "L" },
      { name: "Jaggery powder or Maple Syrup", amount: 80, unit: "g" },
      { name: "Cardamom Powder", amount: 0.5, unit: "tsp" },
      { name: "Saffron Strands", amount: 8, unit: "pieces" },
      { name: "Sliced Almonds & Pistachios", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Lightly crush 3/4 of the roasted makhana, keeping the remaining 1/4 whole.",
      "Bring the milk to a boil in a heavy-bottomed pan. Add saffron strands and simmer on low heat for 10 minutes until it slightly thickens.",
      "Add both crushed and whole makhana to the milk. Cook on medium-low heat for 12-15 minutes, stirring occasionally, until the makhana becomes soft and absorbs the milk flavor.",
      "Stir in the cardamom powder and sliced nuts. Cook for 2 more minutes.",
      "Turn off the heat. Let it cool slightly, then stir in the jaggery powder or sweetener of choice. (Adding jaggery to boiling milk can curdle it).",
      "Serve warm or chilled, garnished with extra saffron and nuts."
    ],
    nutrients: { calories: 180, protein: 6.5, carbs: 28, fat: 4.5 }
  },
  {
    _id: "rec_2",
    name: "Tangy Sprouts & Makhana Chaat",
    description: "An incredibly fresh, crunchy, and oil-free high-protein salad/chaat. Packed with sprouts, juicy cucumbers, tomatoes, seasoned with zesty lemon juice and mint chutney.",
    prepTime: "15 mins",
    cookTime: "5 mins",
    difficulty: "Easy",
    servings: 2,
    image: "/images/hero_bg.png",
    ingredients: [
      { name: "Roasted Crispy Makhana", amount: 40, unit: "g" },
      { name: "Boiled Green Moong Sprouts", amount: 100, unit: "g" },
      { name: "Finely Chopped Onion", amount: 1, unit: "medium" },
      { name: "Chopped Tomatoes & Cucumber", amount: 120, unit: "g" },
      { name: "Mint & Coriander Chutney", amount: 2, unit: "tbsp" },
      { name: "Chaat Masala & Lemon Juice", amount: 1, unit: "tsp" },
      { name: "Pomegranate seeds for garnish", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "In a large mixing bowl, combine the boiled moong sprouts, chopped onions, tomatoes, and cucumbers.",
      "Drizzle the mint-coriander chutney and fresh lemon juice over the mixture.",
      "Sprinkle the chaat masala and salt according to taste. Toss everything gently to mix.",
      "Just before serving, add the crispy roasted makhana and mix quickly so the makhana stays crunchy.",
      "Garnish with fresh coriander leaves, pomegranate seeds, and a pinch of black salt. Enjoy immediately!"
    ],
    nutrients: { calories: 140, protein: 8.0, carbs: 24, fat: 1.2 }
  },
  {
    _id: "rec_3",
    name: "Mughlai Makhana Peas Curry",
    description: "A rich, creamy, and flavorful main course curry. Lightly roasted makhana and tender green peas simmered in a velvet tomato, cashew, and aromatic onion-based gravy.",
    prepTime: "15 mins",
    cookTime: "20 mins",
    difficulty: "Medium",
    servings: 3,
    image: "/images/timeline_roasting.png",
    ingredients: [
      { name: "Roasted Whole Makhana", amount: 60, unit: "g" },
      { name: "Boiled Green Peas", amount: 150, unit: "g" },
      { name: "Onion Paste & Tomato Puree", amount: 200, unit: "g" },
      { name: "Soaked Cashew Paste", amount: 3, unit: "tbsp" },
      { name: "Ginger-Garlic Paste", amount: 1, unit: "tsp" },
      { name: "Garam Masala, Turmeric & Chili Powder", amount: 1, unit: "tsp" },
      { name: "Coriander leaves & Cooking Oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Heat 1 tbsp of oil in a pan and sauté the ginger-garlic paste and onion paste until golden brown.",
      "Add tomato puree and cook until the oil starts separating from the masala.",
      "Add turmeric, red chili powder, coriander powder, and cashew paste. Cook on low heat for 3-4 minutes, stirring continuously.",
      "Pour in 1.5 cups of warm water to form a smooth gravy. Bring it to a gentle boil.",
      "Add the boiled green peas and roasted makhana. Simmer covered for 5-7 minutes so the makhana absorbs the rich gravy.",
      "Stir in garam masala and heavy cream (optional). Garnish with fresh coriander and serve warm with Roti or Naan."
    ],
    nutrients: { calories: 260, protein: 7.8, carbs: 32, fat: 11.5 }
  }
];
export default function Recipes() {
  const [recipes, setRecipes] = useState(BACKUP_RECIPES);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  // Dynamic Servings Scaler state
  const [servingsScale, setServingsScale] = useState(4);
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setRecipes(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Using backup seed recipes data.', err);
        setRecipes(BACKUP_RECIPES);
        setLoading(false);
      });
  }, []);
  // Update scale when selected recipe changes
  useEffect(() => {
    if (recipes[activeIdx]) {
      setServingsScale(recipes[activeIdx].servings);
    }
  }, [activeIdx, recipes]);
  const activeRecipe = recipes[activeIdx];
  const scaleValue = (baseAmount, baseServings) => {
    const ratio = servingsScale / baseServings;
    const scaled = baseAmount * ratio;
    // Format nicely
    if (scaled % 1 === 0) return scaled;
    return Number(scaled.toFixed(2));
  };
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>Kitchen Hub</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Culinary Corner</h2>
        <p style={{ color: 'var(--text-muted)' }}>Healthy cooking ideas using organic popped lotus kernels.</p>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div className="animate-spin-slow" style={{ fontSize: '2.5rem', display: 'inline-block' }}>🌀</div>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Preparing recipes...</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Left panel: Recipes List links */}
          <div style={{
            flex: '1 1 250px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-dark)' }}>Recipes</h3>
            {recipes.map((rec, idx) => (
              <button
                key={rec._id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--border-radius-md)',
                  textAlign: 'left',
                  border: '1px solid var(--border-color)',
                  backgroundColor: activeIdx === idx ? 'var(--primary-light)' : 'var(--bg-card)',
                  color: activeIdx === idx ? 'var(--primary-dark)' : 'var(--text-dark)',
                  cursor: 'pointer',
                  fontWeight: activeIdx === idx ? 'bold' : '500',
                  boxShadow: activeIdx === idx ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{rec.name}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{rec.difficulty}</span>
                </div>
              </button>
            ))}
          </div>
          {/* Right panel: Active Recipe Detail & Servings Calculator */}
          <div style={{ flex: '2 1 600px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="card glass"
                style={{
                  padding: '32px 40px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--border-radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                {/* Recipe Image Header */}
                {activeRecipe.image && (
                  <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: '100%',
                      height: '240px',
                      borderRadius: 'var(--border-radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border-color)',
                      position: 'relative'
                    }}
                  >
                    <img 
                      src={activeRecipe.image} 
                      alt={activeRecipe.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      background: 'linear-gradient(transparent, rgba(47, 43, 39, 0.75))',
                      padding: '16px 24px',
                      color: 'white'
                    }}>
                      <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-title)', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                        👑 Chef's Premium Pick
                      </h4>
                    </div>
                  </motion.div>
                )}

                <div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span className="badge badge-primary">⏱️ Cook: {activeRecipe.cookTime}</span>
                    <span className="badge badge-secondary">🧑‍🍳 Diff: {activeRecipe.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '8px' }}>{activeRecipe.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{activeRecipe.description}</p>
                </div>
                {/* Servings Scaler Interface */}
                <div style={{
                  backgroundColor: 'var(--secondary-light)',
                  padding: '16px 24px',
                  borderRadius: 'var(--border-radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  border: '1px solid rgba(74, 93, 78, 0.1)'
                }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--secondary)', fontWeight: 'bold' }}>Dynamic Servings Scaler</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recalculates ingredient quantities instantly.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                      onClick={() => setServingsScale(Math.max(1, servingsScale - 1))}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)', minWidth: '24px', textAlign: 'center' }}>
                      {servingsScale}
                    </span>
                    <button
                      onClick={() => setServingsScale(servingsScale + 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Ingredients Section */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    Ingredients List
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeRecipe.ingredients.map((ing, i) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>• {ing.name}</span>
                        <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                          {scaleValue(ing.amount, activeRecipe.servings)} {ing.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Cooking Instructions */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    Preparation Steps
                  </h4>
                  <ol style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '20px' }}>
                    {activeRecipe.instructions.map((step, idx) => (
                      <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{step.substring(0, step.indexOf(' ') + 1)}</span>
                        {step.substring(step.indexOf(' ') + 1)}
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Nutrient details card */}
                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>Nutrition per serving:</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span>🔥 <b>{activeRecipe.nutrients.calories}</b> kcal</span>
                    <span>🟢 <b>{activeRecipe.nutrients.protein}g</b> Protein</span>
                    <span>🌾 <b>{activeRecipe.nutrients.carbs}g</b> Carbs</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
