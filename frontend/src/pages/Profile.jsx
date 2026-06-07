// makhana-store > frontend > src > pages > Profile.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export default function Profile() {
  const { userInfo, login, register, error: authError, loading } = useContext(AuthContext);
  const [isLoginView, setIsLoginView] = useState(true);
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // Orders list
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setOrdersLoading(true);
      fetch('/api/orders/myorders', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error('API offline');
          return res.json();
        })
        .then((data) => {
          setOrders(data);
          setOrdersLoading(false);
        })
        .catch((err) => {
          console.warn('Orders fetch failed. Loading simulated local orders.', err);
          // Fallback to local storage simulated orders
          const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
          setOrders(localOrders);
          setOrdersLoading(false);
        });
    }
  }, [userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err) {
      // Errors are handled in AuthContext
    }
  };
  // Logged Out view: Login/Register forms
  if (!userInfo) {
    return (
      <div className="container" style={{ padding: '60px 24px 80px', maxWidth: '480px' }}>
        <div className="card glass animate-fade" style={{ padding: '40px', backgroundColor: 'var(--bg-card)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '2.5rem' }}>🌾</span>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-title)', marginTop: '8px' }}>
              {isLoginView ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {isLoginView ? 'Sign in to access your custom mixes and orders' : 'Join Makhana Bliss for exclusive discount access'}
            </p>
          </div>
          {authError && (
            <div style={{
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent)',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              ⚠️ {authError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLoginView && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Abhishek Kumar"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="abhishek@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
              {loading ? 'Processing...' : isLoginView ? 'Sign In 🔑' : 'Sign Up 🚀'}
            </button>
          </form>
          {/* Demonstration Accounts details banner */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: 'var(--secondary-light)',
            borderRadius: '8px',
            fontSize: '0.75rem',
            lineHeight: '1.4',
            color: 'var(--secondary)'
          }}>
            💡 <b>Testing Mode Account Credentials:</b><br />
            • Admin account: <b>admin@makhana.com</b> / <b>admin123</b><br />
            • Customer account: <b>user@makhana.com</b> / <b>user123</b>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setEmail('');
                setPassword('');
                setName('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-dark)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              {isLoginView ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  // Logged In view: Profile Info & Order History
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Left column: Profile Card */}
        <div className="card glass" style={{
          flex: '1 1 300px',
          padding: '30px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '20px', color: 'var(--text-dark)' }}>
            User Account Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.92rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Full Name</span>
              <p style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{userInfo.name}</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email Address</span>
              <p style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{userInfo.email}</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Account Clearance</span>
              <p style={{ fontWeight: 'bold', color: userInfo.isAdmin ? 'var(--accent)' : 'var(--secondary)' }}>
                {userInfo.isAdmin ? '👑 Site Administrator' : '🟢 Standard Member'}
              </p>
            </div>
          </div>
        </div>
        {/* Right column: Orders List */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>
            Order History & Tracking
          </h3>
          {ordersLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="animate-spin-slow" style={{ fontSize: '2rem', display: 'inline-block' }}>🌀</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Retrieving order statements...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((ord) => (
                <div key={ord._id} className="card animate-fade" style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '12px'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order Number</span>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>#{ord._id}</h4>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Placed Date</span>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Price</span>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 'bold' }}>
                        ${ord.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* Order items list */}
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Shipped Items</h5>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                      {ord.orderItems.map((item, idx) => (
                        <li key={idx} style={{ color: 'var(--text-dark)' }}>
                          • {item.name} <span style={{ color: 'var(--text-muted)' }}>(Qty: {item.qty} @ ${item.price.toFixed(2)})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Status row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '4px',
                    fontSize: '0.85rem'
                  }}>
                    <div>
                      <span>Payment Status: </span>
                      <span style={{
                        color: ord.isPaid ? 'var(--success)' : 'var(--accent)',
                        fontWeight: 'bold'
                      }}>
                        {ord.isPaid ? '✓ PAID' : 'PENDING'}
                      </span>
                    </div>
                    <div>
                      <span>Shipping Delivery: </span>
                      <span style={{
                        color: ord.isDelivered ? 'var(--success)' : 'var(--primary-dark)',
                        fontWeight: 'bold'
                      }}>
                        {ord.isDelivered ? '✓ DELIVERED' : '🚚 IN TRANSIT'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

