import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
import { Clock, ChefHat, Users, Scale, CheckCircle2, Flame, Award, BookOpen, ChevronRight, Check } from 'lucide-react';

const BACKUP_RECIPES = [
  {
    _id: "rec_1",
    name: "Royal Creamy Makhana Kheer",
    description: "A luxurious and healthy twist to the traditional Indian rice pudding. Made with slow-reduced milk, roasted ground makhana, saffron, cardamom, and garnished with pistachios.",
    prepTime: "10 mins",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    image: "/images/recipe_kheer.png",
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
      "Add both crushed and whole makhana to the milk. Cook on medium-low heat for 15 minutes, stirring occasionally, until the makhana becomes soft.",
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
    image: "/images/recipe_chaat.png",
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
    image: "/images/recipe_curry.png",
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
      "Stir in garam masala and heavy cream (optional). Garnish with fresh coriander and serve warm."
    ],
    nutrients: { calories: 260, protein: 7.8, carbs: 32, fat: 11.5 }
  }
];

export default function Recipes() {
  const [recipes, setRecipes] = useState(BACKUP_RECIPES);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [servingsScale, setServingsScale] = useState(4);
  
  // Track checked ingredients state
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/api/recipes`)
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

  useEffect(() => {
    if (recipes[activeIdx]) {
      setServingsScale(recipes[activeIdx].servings);
    }
  }, [activeIdx, recipes]);

  const activeRecipe = recipes[activeIdx];

  const scaleValue = (baseAmount, baseServings) => {
    const ratio = servingsScale / baseServings;
    const scaled = baseAmount * ratio;
    if (scaled % 1 === 0) return scaled;
    return Number(scaled.toFixed(2));
  };

  const toggleIngredient = (recipeId, index) => {
    const key = `${recipeId}_${index}`;
    setCheckedIngredients(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Title Banner */}
      <div style={{
        background: 'linear-gradient(rgba(44, 58, 47, 0.94), rgba(44, 58, 47, 0.90)), url("/images/hero_bg.png") center/cover no-repeat',
        color: 'white',
        padding: '60px 24px',
        borderRadius: '24px',
        textAlign: 'center',
        marginBottom: '40px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', marginBottom: '12px', fontWeight: 'bold' }}>Kitchen Hub</span>
        <h2 style={{ fontSize: '2.5rem', color: 'white', fontFamily: 'var(--font-title)', margin: 0 }}>Culinary Corner</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '8px 0 0', fontSize: '1.05rem' }}>Healthy cooking ideas using organic popped lotus kernels.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ display: 'inline-block', color: 'var(--primary)' }}
          >
            <ChefHat size={40} />
          </motion.div>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Preparing recipes...</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Top Panel: Grid of Recipe Selector Cards */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BookOpen size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: 0 }}>
                Choose Recipe
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {recipes.map((rec, idx) => (
                <motion.div
                  key={rec._id}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    borderRadius: '20px',
                    border: activeIdx === idx ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all var(--transition-fast)',
                    boxShadow: activeIdx === idx ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  {/* Card Thumbnail Image */}
                  <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={rec.image} 
                      alt={rec.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                      <span className="badge" style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 8px',
                        backgroundColor: rec.difficulty === 'Easy' ? '#EBFBEE' : '#FFF0E6',
                        color: rec.difficulty === 'Easy' ? '#2B8A3E' : '#D9480F',
                        fontWeight: 'bold'
                      }}>
                        {rec.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Card text details */}
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                    <h4 style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: activeIdx === idx ? '800' : '700', 
                      color: 'var(--text-dark)',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {rec.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> Prep: {rec.prepTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ChefHat size={12} /> Cook: {rec.cookTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Panel: Detailed View of Active Recipe */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="card glass"
                style={{
                  padding: '40px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '24px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {/* Large Cover Hero Section */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)'
                }}>
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
                    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                    padding: '24px 30px',
                    color: 'white'
                  }}>
                    <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', marginBottom: '8px', fontWeight: 'bold' }}>Chef's Recipe Selection</span>
                    <h3 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-title)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{activeRecipe.name}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: '6px 0 0', fontSize: '0.95rem', maxWidth: '700px' }}>{activeRecipe.description}</p>
                  </div>
                </div>

                {/* Info and Scaler Grid */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px',
                  borderRadius: '20px',
                  backgroundColor: '#FAFAF8',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={20} style={{ color: 'var(--primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cook Time</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{activeRecipe.cookTime}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ChefHat size={20} style={{ color: 'var(--primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Difficulty</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{activeRecipe.difficulty}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={20} style={{ color: 'var(--primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Servings</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{activeRecipe.servings} base</div>
                      </div>
                    </div>
                  </div>

                  {/* Servings Scaler controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Scale size={18} style={{ color: 'var(--secondary)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Portions:</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => setServingsScale(Math.max(1, servingsScale - 1))}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)', minWidth: '24px', textAlign: 'center' }}>
                        {servingsScale}
                      </span>
                      <button
                        onClick={() => setServingsScale(servingsScale + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Double column grid for Ingredients and Steps */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '40px'
                }}>
                  {/* Ingredients Column */}
                  <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--text-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--primary)' }} />
                      Ingredients Checklist
                    </h4>
                    
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Click ingredients below to check them off as you prep:</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {activeRecipe.ingredients.map((ing, i) => {
                        const isChecked = checkedIngredients[`${activeRecipe._id}_${i}`];
                        return (
                          <motion.div
                            whileTap={{ scale: 0.98 }}
                            key={i}
                            onClick={() => toggleIngredient(activeRecipe._id, i)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              backgroundColor: isChecked ? 'rgba(74, 93, 78, 0.04)' : 'var(--primary-light)',
                              border: isChecked ? '1px dashed var(--border-color)' : '1px solid transparent',
                              cursor: 'pointer',
                              opacity: isChecked ? 0.6 : 1,
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '4px',
                                border: '1px solid var(--primary-dark)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isChecked ? 'var(--primary-dark)' : 'white',
                                color: 'white',
                                flexShrink: 0
                              }}>
                                {isChecked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <span style={{ 
                                color: 'var(--text-dark)', 
                                fontSize: '0.9rem', 
                                fontWeight: 500,
                                textDecoration: isChecked ? 'line-through' : 'none'
                              }}>
                                {ing.name}
                              </span>
                            </div>
                            <span style={{ 
                              color: 'var(--primary-dark)', 
                              fontWeight: 'bold', 
                              fontSize: '0.9rem',
                              textDecoration: isChecked ? 'line-through' : 'none'
                            }}>
                              {scaleValue(ing.amount, activeRecipe.servings)} {ing.unit}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preparation Steps Column */}
                  <div style={{ flex: '1.5 1 450px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--text-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                      Preparation Steps
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {activeRecipe.instructions.map((step, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          gap: '16px', 
                          padding: '20px', 
                          borderRadius: '16px', 
                          backgroundColor: '#FCFAF7', 
                          border: '1px solid var(--border-color)' 
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>
                          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nutrition Breakdown details */}
                <div style={{
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Nutrition Facts (Per Portion)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(226, 88, 62, 0.05)', borderRadius: '12px', border: '1px solid rgba(226, 88, 62, 0.1)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Energy (Calories)</span>
                      <p style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Flame size={16} /> {activeRecipe.nutrients.calories} kcal
                      </p>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(74, 93, 78, 0.05)', borderRadius: '12px', border: '1px solid rgba(74, 93, 78, 0.1)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protein Yield</span>
                      <p style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                        {activeRecipe.nutrients.protein}g
                      </p>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(193, 154, 107, 0.05)', borderRadius: '12px', border: '1px solid rgba(193, 154, 107, 0.1)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbohydrates</span>
                      <p style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#966F33' }}>
                        {activeRecipe.nutrients.carbs}g
                      </p>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#F8F8F8', borderRadius: '12px', border: '1px solid #EEE' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dietary Fats</span>
                      <p style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#666' }}>
                        {activeRecipe.nutrients.fat}g
                      </p>
                    </div>
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
