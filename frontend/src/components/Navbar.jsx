import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, Moon, Sun, ShoppingCart, User, LogOut, ChevronDown, Menu, X, Disc } from 'lucide-react';
export default function Navbar({ currentRoute, navigateTo }) {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Shop', route: 'catalog' },
    { label: 'Custom Bowl', route: 'customizer' },
    { label: 'Recipes', route: 'recipes' },
  ];
  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 24px',
      transition: 'background var(--transition-medium)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 'var(--max-width)',
        margin: '0 auto'
      }}>
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 800,
          fontSize: '1.5rem',
          fontFamily: 'var(--font-title)',
          color: 'var(--primary-dark)',
          letterSpacing: '-0.5px'
        }}>
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            style={{
              height: '32px',
              width: '32px',
              objectFit: 'contain',
              borderRadius: '50%'
            }} 
          />
          <span style={{ color: 'var(--text-dark)' }}>Makhana</span>
          <span style={{ color: 'var(--primary)', fontWeight: '500' }}>Bliss</span>
        </a>
        {/* Desktop Navigation Links */}
        <ul className="desktop-menu" style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {navLinks.map((link) => {
            if (link.label === 'Shop') {
              return (
                <li 
                  key={link.route}
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  onMouseLeave={() => setShopDropdownOpen(false)}
                  style={{ position: 'relative' }}
                >
                  <a
                    href="#catalog"
                    onClick={(e) => { e.preventDefault(); navigateTo('catalog'); }}
                    style={{
                      fontFamily: 'var(--font-title)',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: currentRoute === 'catalog' ? 'var(--primary-dark)' : 'var(--text-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '16px 0',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    Shop
                    <ChevronDown size={14} style={{
                      transform: shopDropdownOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }} />
                  </a>

                  {/* Dropdown menu containing actual image cards for Catalog and Pantry */}
                  <AnimatePresence>
                    {shopDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 12, scale: 0.95, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 12, scale: 0.95, x: '-50%' }}
                        transition={{ duration: 0.2 }}
                        className="glass" 
                        style={{
                          position: 'absolute',
                          top: 'calc(100% - 8px)',
                          left: '50%',
                          width: '340px',
                          padding: '16px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '16px',
                          boxShadow: 'var(--shadow-xl)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          zIndex: 100
                        }}
                      >
                        <a 
                          href="#catalog" 
                          onClick={(e) => { e.preventDefault(); navigateTo('catalog'); setShopDropdownOpen(false); }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '10px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            border: '1px solid transparent'
                          }}
                          className="dropdown-item-hover"
                        >
                          <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#fcfcfc', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img 
                              src="/images/product_salted.png" 
                              alt="Catalog" 
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                              Catalog 
                              <ShoppingBag size={14} style={{ color: 'var(--primary)' }} />
                            </h4>
                            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Browse organic slow-roasted flavors</p>
                          </div>
                        </a>

                        <a 
                          href="#catalog" 
                          onClick={(e) => { e.preventDefault(); navigateTo('catalog'); setShopDropdownOpen(false); }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '10px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            border: '1px solid transparent'
                          }}
                          className="dropdown-item-hover"
                        >
                          <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                            <img 
                              src="/images/hero_banner.png" 
                              alt="Pantry" 
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                              Pantry
                              <Package size={14} style={{ color: 'var(--primary)' }} />
                            </h4>
                            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stock up on healthy popped blends</p>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.route}>
                <a
                  href={`#${link.route}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(link.route); }}
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: currentRoute === link.route ? 'var(--primary-dark)' : 'var(--text-dark)',
                    position: 'relative',
                    padding: '16px 0',
                    transition: 'color var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {link.label === 'Custom Bowl' && (
                    <Disc size={16} style={{ color: 'var(--primary)' }} />
                  )}
                  {link.label}
                  {currentRoute === link.route && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '2px'
                    }} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        {/* Right side Actions (Cart, Login, Dark Mode, Mobile toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-dark)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)'
          }}
          className="btn-icon desktop-action"
          title="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          {/* Cart Trigger */}
          <a
            href="#cart"
            onClick={(e) => { e.preventDefault(); navigateTo('cart'); }}
            style={{
              position: 'relative',
              padding: '8px',
              color: 'var(--text-dark)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="animate-fade" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'var(--accent)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(226,88,62,0.4)'
              }}>
                {cartCount}
              </span>
            )}
          </a>
          {/* Authentication Action */}
          {userInfo ? (
            <div className="desktop-action" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href="#profile"
                onClick={(e) => { e.preventDefault(); navigateTo('profile'); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '8px 16px',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  borderRadius: '20px'
                }}
              >
                <User size={16} />
                {userInfo.name.split(' ')[0]}
              </a>
              {userInfo.isAdmin && (
                <button
                  onClick={() => navigateTo('admin')}
                  className="btn btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Admin
                </button>
              )}
              <button
                onClick={logout}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}
                className="hover-underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigateTo('profile')}
              className="btn btn-primary desktop-action"
              style={{
                padding: '8px 20px',
                fontSize: '0.85rem'
              }}
            >
              Sign In
            </button>
          )}
          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--text-dark)',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-drawer" 
            style={{
              position: 'absolute',
              top: 'var(--nav-height)',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--bg-main)',
              borderBottom: '1px solid var(--border-color)',
              borderLeft: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              padding: '24px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 999,
              overflow: 'hidden'
            }}
          >
            {navLinks.map((link) => {
              if (link.label === 'Shop') {
                return (
                  <div key={link.route} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px 0' }}>
                    <span style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shop Menu</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '12px', marginTop: '4px' }}>
                      <a
                        href="#catalog"
                        onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('catalog'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                      >
                        <img src="/images/product_salted.png" alt="Catalog" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                        Catalog
                      </a>
                      <a
                        href="#catalog"
                        onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigateTo('catalog'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                      >
                        <img src="/images/hero_banner.png" alt="Pantry" style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '4px' }} />
                        Pantry
                      </a>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={link.route}
                  href={`#${link.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigateTo(link.route);
                  }}
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    color: currentRoute === link.route ? 'var(--primary-dark)' : 'var(--text-dark)',
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {link.label === 'Custom Bowl' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-dark)' }}>
                      <path d="M3 12a9 9 0 0 0 18 0H3Z" />
                      <path d="M21 12c.3 0 .5-.2.5-.5V10c0-.6-.4-1-1-1H3.5c-.6 0-1 .4-1 1v1.5c0 .3.2.5.5.5" />
                    </svg>
                  )}
                  {link.label}
                </a>
              );
            })}

            {/* Mobile Theme Toggle */}
            <div style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>Dark Theme</span>
              <button onClick={toggleDarkMode} style={{
                background: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: 'var(--text-dark)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)'
              }}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Auth Actions */}
            <div style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}>
              {userInfo ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontWeight: 600 }}>
                    <User size={18} />
                    <span>{userInfo.name}</span>
                    {userInfo.isAdmin && <span className="badge badge-accent" style={{ marginLeft: 'auto' }}>Admin</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); navigateTo('profile'); }}
                      className="btn btn-outline" 
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    >
                      Profile
                    </button>
                    {userInfo.isAdmin && (
                      <button 
                        onClick={() => { setMobileMenuOpen(false); navigateTo('admin'); }}
                        className="btn btn-secondary" 
                        style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                      >
                        Console
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="btn btn-outline" 
                    style={{ width: '100%', padding: '10px', borderColor: 'var(--accent)', color: 'var(--accent)', marginTop: '8px' }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigateTo('profile'); }}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '12px' }}
                >
                  Sign In
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      {/* Styling for Responsive Navbar */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu, .desktop-action {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
        .btn-icon:hover {
          background-color: var(--border-color) !important;
        }
        .hover-underline:hover {
          text-decoration: underline;
        }
        .dropdown-item-hover {
          border: 1px solid transparent;
          transition: all var(--transition-fast) !important;
        }
        .dropdown-item-hover:hover {
          background-color: var(--primary-light) !important;
          border-color: var(--border-color) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </nav>
  );
}
