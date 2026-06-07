import React from 'react';
export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  const { name, category, price, rating, description, color, _id } = product;
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      {/* Product Header Graphic Accent */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <span className="badge badge-primary" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: 'white',
          boxShadow: 'var(--shadow-sm)'
        }}>{category}</span>
        {/* Floating Popped Grains decoration */}
        <div style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: 'white',
          borderRadius: '50%',
          top: '25px',
          right: '30px',
          opacity: 0.7,
          transform: 'rotate(10deg)'
        }} />
        {/* Actual Product Image */}
        <img 
          src={product.image || '/images/product_salted.png'} 
          alt={name}
          style={{
            height: '150px',
            objectFit: 'contain',
            filter: (_id === 'prod_6' || product.id === 'prod_6') ? 'hue-rotate(120deg)' : 'none',
            transform: 'rotate(-5deg)',
            transition: 'transform var(--transition-fast)',
            cursor: 'pointer',
            zIndex: 2
          }}
          onClick={onViewDetails}
          className="packet-hover"
        />
      </div>
      {/* Product Card Details */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
        <div style={{ cursor: 'pointer' }} onClick={onViewDetails}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '4px' }}>{name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <span style={{ color: '#FFB300' }}>★</span>
            <span style={{ fontWeight: 600 }}>{rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>Rating</span>
          </div>
        </div>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: '1.5',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          flexGrow: 1
        }}>{description}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '16px'
        }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>${price.toFixed(2)}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onViewDetails}
              className="btn btn-outline"
              style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              Details
            </button>
            <button
              onClick={onAddToCart}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px' }}
            >
              Add +
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .packet-hover:hover {
          transform: rotate(0deg) scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}