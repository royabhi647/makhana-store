import React from 'react';
export default function Footer({ navigateTo }) {
  return (
    <footer style={{
      backgroundColor: 'var(--text-dark)',
      color: 'var(--text-light)',
      padding: '64px 24px 24px',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      transition: 'background var(--transition-medium)'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {/* Brand details */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.4rem',
            marginBottom: '16px',
            color: 'var(--primary)'
          }}>Makhana Bliss</h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
            lineHeight: '1.7'
          }}>
            Bringing you the finest grade slow-roasted lotus seeds harvested from organic waters. Healthy, nutritious, and absolutely delicious.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Simple SVGs for Social media */}
            <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75Z"/></svg>
            </a>
            <a href="#" style={{ color: 'var(--text-muted)' }} aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.1rem',
            marginBottom: '16px',
            color: 'var(--primary-light)'
          }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'var(--text-muted)' }} className="footer-link">Home</a>
            </li>
            <li>
              <a href="#catalog" onClick={(e) => { e.preventDefault(); navigateTo('catalog'); }} style={{ color: 'var(--text-muted)' }} className="footer-link">Shop Makhana</a>
            </li>
            <li>
              <a href="#customizer" onClick={(e) => { e.preventDefault(); navigateTo('customizer'); }} style={{ color: 'var(--text-muted)' }} className="footer-link">Custom Mix Bowl</a>
            </li>
            <li>
              <a href="#recipes" onClick={(e) => { e.preventDefault(); navigateTo('recipes'); }} style={{ color: 'var(--text-muted)' }} className="footer-link">Makhana Recipes</a>
            </li>
          </ul>
        </div>
        {/* Customer Support */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.1rem',
            marginBottom: '16px',
            color: 'var(--primary-light)'
          }}>Support</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Track Order</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.1rem',
            marginBottom: '16px',
            color: 'var(--primary-light)'
          }}>Stay Crisp</h4>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>Subscribe to receive updates on special recipes and discounts.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="email" placeholder="Your email..." style={{
              padding: '10px 16px',
              borderRadius: '25px',
              border: '1px solid #444',
              backgroundColor: '#2E2B27',
              color: 'white',
              fontSize: '0.85rem',
              width: '100%',
              outline: 'none'
            }} />
            <button className="btn btn-primary" style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              borderRadius: '25px'
            }}>Join</button>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid #333',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <p>&copy; {new Date().getFullYear()} Makhana Bliss. All rights reserved.</p>
        <p>Premium Gourmet Fox Nuts | Made with 💚</p>
      </div>
      <style>{`
        .footer-link:hover {
          color: var(--primary) !important;
          padding-left: 4px;
        }
        .footer-link {
          transition: all var(--transition-fast);
        }
      `}</style>
    </footer>
  );
}
