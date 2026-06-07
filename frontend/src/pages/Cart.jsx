// makhana-store > frontend > src > pages > Cart.jsx

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, ShoppingBag, Truck, Sparkles, Disc, Package, CreditCard, Trash2, ArrowLeft } from 'lucide-react';

export default function Cart({ navigateTo }) {
  const { userInfo } = useContext(AuthContext);
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    updateQty,
    removeFromCart
  } = useContext(CartContext);
  const threshold = 30;
  const neededForFreeShipping = Math.max(0, threshold - itemsPrice);
  
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>Your Bag</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <ShoppingCart size={64} style={{ color: 'var(--primary)', opacity: 0.8 }} />
          <h3>Your cart is empty!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Browse our superfood makhana flavors and add them here.</p>
          <button 
            onClick={() => navigateTo('catalog')} 
            className="btn btn-primary" 
            style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Go to Shop
            <ShoppingBag size={18} />
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'flex-start'
        }}>
          {/* Left panel: List items */}
          <div style={{
            flex: '2 1 600px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Free Shipping incentive alert */}
            <div className="glass animate-fade" style={{
              padding: '16px 20px',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: neededForFreeShipping > 0 ? 'var(--primary-light)' : 'var(--secondary-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {neededForFreeShipping > 0 ? (
                <Truck size={20} style={{ color: 'var(--primary)' }} />
              ) : (
                <Sparkles size={20} style={{ color: 'var(--secondary)' }} />
              )}
              <p style={{ fontSize: '0.9rem', fontWeight: 500, color: neededForFreeShipping > 0 ? 'var(--primary-dark)' : 'var(--secondary)', margin: 0 }}>
                {neededForFreeShipping > 0
                  ? `Add $${neededForFreeShipping.toFixed(2)} more to qualify for FREE Shipping!`
                  : "Congratulations! Your order qualifies for Free Shipping!"}
              </p>
            </div>

            {/* Cart Items Cards */}
            {cartItems.map((item) => (
              <div key={item.id} className="card animate-fade" style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                border: '1px solid var(--border-color)'
              }}>
                {/* Item metadata representation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: item.color + '12',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid ' + item.color + '44',
                    flexShrink: 0,
                    color: item.color,
                    overflow: 'hidden',
                    padding: '4px'
                  }}>
                    {item.isCustom ? (
                      <img 
                        src="/images/flavor_classic.png" 
                        alt="Custom Mix" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    ) : (
                      <img 
                        src={item.image || '/images/product_salted.png'} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      />
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', margin: '0 0 4px' }}>{item.name}</h4>
                    {item.isCustom ? (
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '350px' }}>
                        Custom Mix: {Object.keys(item.customDetails.shares)
                          .filter(k => item.customDetails.shares[k] > 0)
                          .map(k => `${k}(${Math.round(item.customDetails.shares[k])}%)`)
                          .join(', ')}
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Premium Flavor | 100g Bag</p>
                    )}
                  </div>
                </div>

                {/* Adjuster controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem', minWidth: '18px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-dark)', minWidth: '60px' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel: Summary Block */}
          <div className="card glass" style={{
            flex: '1 1 300px',
            padding: '30px',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', color: 'var(--text-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Items Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping Fee</span>
                <span style={{ fontWeight: shippingPrice === 0 ? 'bold' : 'normal', color: shippingPrice === 0 ? 'var(--secondary)' : 'var(--text-dark)' }}>
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%)</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: 'var(--text-dark)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
                marginTop: '4px'
              }}>
                <span>Total Amount</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {userInfo ? (
              <button
                onClick={() => navigateTo('checkout')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Proceed to Checkout
                <CreditCard size={18} />
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => navigateTo('profile')}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                >
                  Sign In to Order
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                  Please login or register to complete purchase.
                </p>
              </div>
            )}
            <button
              onClick={() => navigateTo('catalog')}
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}