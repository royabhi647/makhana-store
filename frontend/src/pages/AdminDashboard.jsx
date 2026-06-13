import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function AdminDashboard() {
  const { userInfo } = useContext(AuthContext);
  // Lists state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [products, setProducts] = useState([]);
  // Form states for creating product
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Plain');
  const [flavor, setFlavor] = useState('Classic');
  const [stock, setStock] = useState('100');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#F3E5AB');
  const [creating, setCreating] = useState(false);
  // Fetch all orders and products
  const loadData = () => {
    if (userInfo && userInfo.isAdmin) {
      setLoadingOrders(true);
      // Load Orders
      fetch(`${API_BASE}/api/orders`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error('API offline');
          return res.json();
        })
        .then((data) => {
          setOrders(data);
          setLoadingOrders(false);
        })
        .catch((err) => {
          console.warn('Orders dashboard load failed. Loading simulated local orders.', err);
          const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
          setOrders(localOrders);
          setLoadingOrders(false);
        });
      // Load Products
      fetch(`${API_BASE}/api/products`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.warn('Products load failed.', err));
    }
  };
  useEffect(() => {
    loadData();
  }, [userInfo]);
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !description) {
      alert("Please fill name, price, and description");
      return;
    }
    setCreating(true);
    const productData = {
      name,
      price: Number(price),
      category,
      flavor,
      stock: Number(stock),
      description,
      color,
      nutrients: { calories: 350, protein: 9, carbs: 75, fat: 2, fiber: 14 }
    };
    try {
      const response = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(productData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Product creation failed');
      alert('Product created successfully!');
      
      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      
      loadData();
    } catch (err) {
      console.warn('Backend product creation failed. Simulating local addition.', err);
      alert('Product added locally! (Backend simulated)');
      
      const newProduct = {
        _id: 'prod_local_' + Math.random().toString(36).substring(2, 9),
        ...productData,
        rating: 5.0
      };
      
      setProducts([...products, newProduct]);
      setName('');
      setPrice('');
      setDescription('');
    } finally {
      setCreating(false);
    }
  };
  const handleDeliver = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE}/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Delivery update failed');
      alert('Order marked as Delivered!');
      loadData();
    } catch (err) {
      console.warn('Backend deliver update failed. Simulating local update.', err);
      
      // Update local storage orders
      const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const updated = localOrders.map((o) =>
        o._id === orderId ? { ...o, isDelivered: true, deliveredAt: new Date().toISOString() } : o
      );
      localStorage.setItem('localOrders', JSON.stringify(updated));
      // Update state
      setOrders(orders.map((o) =>
        o._id === orderId ? { ...o, isDelivered: true, deliveredAt: new Date().toISOString() } : o
      ));
      alert('Order marked as Delivered locally!');
    }
  };
  if (!userInfo || !userInfo.isAdmin) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h3>Access Denied</h3>
        <p style={{ color: 'var(--text-muted)' }}>You must be logged in as an Administrator to view this panel.</p>
      </div>
    );
  }
  // Calculate quick metrics for visual dashboard charts
  const totalSalesVal = orders.reduce((acc, o) => acc + (o.isPaid ? o.totalPrice : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingShipmentsCount = orders.filter((o) => !o.isDelivered).length;
  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-accent" style={{ marginBottom: '8px' }}>Control Panel</span>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--text-dark)' }}>Admin Console</h2>
      </div>
      {/* Metrics widgets row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div className="card" style={{ padding: '24px', backgroundColor: 'var(--secondary-light)', border: '1px solid rgba(74,93,78,0.1)' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase' }}>Gross Sales Revenue</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-dark)' }}>${totalSalesVal.toFixed(2)}</p>
        </div>
        <div className="card" style={{ padding: '24px', backgroundColor: 'var(--primary-light)', border: '1px solid rgba(193,154,107,0.1)' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>Completed Transactions</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-dark)' }}>{totalOrdersCount} Orders</p>
        </div>
        <div className="card" style={{ padding: '24px', backgroundColor: 'var(--accent-light)', border: '1px solid rgba(226,88,62,0.1)' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase' }}>Pending Deliveries</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-dark)' }}>{pendingShipmentsCount} Shipments</p>
        </div>
      </div>
      {/* Dashboard analytics: Sales Chart */}
      <div className="card" style={{ padding: '32px', backgroundColor: 'white', marginBottom: '40px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '16px' }}>Interactive CSS Sales Metrics</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Displays order totals proportionally inside a responsive CSS chart container.</p>
        
        {orders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>No sales data available yet.</p>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '20px',
            height: '180px',
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '8px',
            overflowX: 'auto'
          }}>
            {orders.map((ord) => {
              // Scale bar heights relative to a max price of $100
              const percentageHeight = Math.min(100, (ord.totalPrice / 80) * 100);
              
              return (
                <div key={ord._id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: '0 0 70px'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>${ord.totalPrice.toFixed(0)}</span>
                  <div style={{
                    width: '36px',
                    height: `${percentageHeight}px`,
                    backgroundColor: ord.isDelivered ? 'var(--secondary)' : 'var(--primary)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 1s ease',
                    boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)'
                  }} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '65px', whiteSpace: 'nowrap' }}>
                    #{ord._id.substring(ord._id.length - 5)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Left Side: Create Product Form */}
        <div className="card" style={{
          flex: '1 1 300px',
          padding: '30px',
          backgroundColor: 'white',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '20px', color: 'var(--text-dark)' }}>
            Add New Product
          </h3>
          <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Spicy Wasabi Makhana"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  placeholder="5.99"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Units</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="form-control"
                  placeholder="100"
                  required
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" style={{ cursor: 'pointer' }}>
                  <option value="Plain">Plain</option>
                  <option value="Savory">Savory</option>
                  <option value="Spicy">Spicy</option>
                  <option value="Sweet">Sweet</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Theme Color</label>
                <select value={color} onChange={(e) => setColor(e.target.value)} className="form-control" style={{ cursor: 'pointer' }}>
                  <option value="#F3E5AB">Yellow/Cream</option>
                  <option value="#FF7F50">Coral/Orange</option>
                  <option value="#E2583E">Crimson/Red</option>
                  <option value="#C19A6B">Brown/Caramel</option>
                  <option value="#E9FFDB">Mint/Green</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                style={{ height: '80px', resize: 'none' }}
                placeholder="Write ingredients and features..."
                required
              />
            </div>
            <button type="submit" disabled={creating} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              {creating ? 'Creating...' : 'Register Product +'}
            </button>
          </form>
        </div>
        {/* Right Side: Orders Manager */}
        <div style={{ flex: '2 1 450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>
            Customer Orders List
          </h3>
          {loadingOrders ? (
            <p>Loading transactions...</p>
          ) : orders.length === 0 ? (
            <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No orders placed by customers yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((ord) => (
                <div key={ord._id} className="card" style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                    <span><b>Order ID:</b> #{ord._id}</span>
                    <span><b>User:</b> {ord.user ? ord.user.name : 'Simulated Guest'}</span>
                    <span><b>Total:</b> ${ord.totalPrice.toFixed(2)}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Items</h5>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-dark)', paddingLeft: '14px' }}>
                      {ord.orderItems.map((item, i) => (
                        <li key={i}>{item.name} x{item.qty}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '12px',
                    fontSize: '0.85rem',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div>
                      <span>Delivery: </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: ord.isDelivered ? 'var(--success)' : 'var(--accent)'
                      }}>{ord.isDelivered ? 'DELIVERED ✓' : 'PENDING'}</span>
                    </div>
                    {!ord.isDelivered && (
                      <button
                        onClick={() => handleDeliver(ord._id)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem', borderRadius: '4px' }}
                      >
                        Mark Shipped 🚚
                      </button>
                    )}
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
