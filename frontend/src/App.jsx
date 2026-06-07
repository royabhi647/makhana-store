import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
// Import Contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
// Import Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Import Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Recipes from './pages/Recipes';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import InteractiveBowl from './components/InteractiveBowl';
// Bind confetti to window for child component access
window.confetti = confetti;
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  // Simple state router synced with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Handle routes with params, e.g., #recipe/1
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    // Init route from current hash
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  const navigateTo = (route) => {
    window.location.hash = `#${route}`;
    setCurrentRoute(route);
  };
  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'catalog':
        return <Catalog />;
      case 'customizer':
        return (
          <div className="container" style={{ padding: '40px 24px 80px' }}>
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
              <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', marginBottom: '12px', fontWeight: 'bold' }}>Mix Lab</span>
              <h2 style={{ fontSize: '2.5rem', color: 'white', fontFamily: 'var(--font-title)', margin: 0 }}>Mix Your Own Bowl</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '8px 0 0', fontSize: '1.05rem' }}>Drag the sliders to adjust flavor shares. Name your mix and buy your custom recipe.</p>
            </div>
            <InteractiveBowl onSuccess={() => navigateTo('cart')} />
          </div>
        );
      case 'recipes':
        return <Recipes />;
      case 'cart':
        return <Cart navigateTo={navigateTo} />;
      case 'checkout':
        return <Checkout navigateTo={navigateTo} />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };
  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar currentRoute={currentRoute} navigateTo={navigateTo} />
          <main style={{ flexGrow: 1 }}>
            {renderPage()}
          </main>
          <Footer navigateTo={navigateTo} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
