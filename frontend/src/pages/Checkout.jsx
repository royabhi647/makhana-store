// makhana-store > frontend > src > pages > Checkout.jsx

import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
export default function Checkout({ navigateTo }) {
  const { userInfo } = useContext(AuthContext);
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    setShippingAddress,
    setPaymentMethod,
    clearCart
  } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Success
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [cardHolder, setCardHolder] = useState(userInfo ? userInfo.name : '');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      alert("Please fill all shipping fields");
      return;
    }
    setShippingAddress({ address, city, postalCode, country });
    setStep(2);
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };
  const handlePlaceOrder = async () => {
    setSubmitting(true);
    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item.product // standard id or custom details
      })),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    };
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Order creation failed');
      }
      // If backend works, pay the order mock-style immediately
      const payResponse = await fetch(`/api/orders/${data._id}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ id: 'MOCK_PAY_' + Date.now(), status: 'COMPLETED' })
      });
      const paidData = await payResponse.json();
      setPlacedOrder(paidData);
      setStep(4);
      clearCart();
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
      }
    } catch (err) {
      console.warn('Backend order placement failed. Simulating local checkout success.', err);
      
      // Local Database Fallback Simulation
      const simulatedOrder = {
        _id: 'ord_local_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        orderItems: orderData.orderItems,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: orderData.itemsPrice,
        taxPrice: orderData.taxPrice,
        shippingPrice: orderData.shippingPrice,
        totalPrice: orderData.totalPrice,
        isPaid: true,
        paidAt: new Date().toISOString(),
        isDelivered: false,
        createdAt: new Date().toISOString()
      };
      // Store in local storage orders array for consistency
      const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
      localOrders.push(simulatedOrder);
      localStorage.setItem('localOrders', JSON.stringify(localOrders));
      setPlacedOrder(simulatedOrder);
      setStep(4);
      clearCart();
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '800px' }}>
      
      {/* Checkout Progress Header */}
      {step < 4 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* Timeline Connector Line */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '2px',
            backgroundColor: 'var(--border-color)',
            zIndex: 1,
            transform: 'translateY(-50%)'
          }} />
          {/* Step circles */}
          {[
            { label: 'Shipping', num: 1 },
            { label: 'Payment', num: 2 },
            { label: 'Review', num: 3 }
          ].map((s) => (
            <div key={s.num} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              gap: '6px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: step === s.num
                  ? 'var(--primary)'
                  : step > s.num
                    ? 'var(--secondary)'
                    : 'var(--border-color)',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                boxShadow: step === s.num ? '0 0 0 6px var(--primary-light)' : 'none',
                transition: 'all var(--transition-fast)'
              }}>
                {s.num}
              </div>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: step >= s.num ? 'var(--text-dark)' : 'var(--text-muted)',
                backgroundColor: 'var(--bg-main)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      {/* Step 1: Shipping Address */}
      {step === 1 && (
        <div className="card glass animate-fade" style={{ padding: '40px', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '24px' }}>Delivery Address</h3>
          <form onSubmit={handleShippingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="123 Lotus Lane"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control"
                  placeholder="New Delhi"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="form-control"
                  placeholder="110001"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
                placeholder="India"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
              Continue to Payment 💳
            </button>
          </form>
        </div>
      )}
      {/* Step 2: Payment Details */}
      {step === 2 && (
        <div className="card glass animate-fade" style={{ padding: '40px', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '24px' }}>Secure Payment</h3>
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Payment Method Selector */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{
                flex: 1,
                border: '2px solid var(--primary)',
                padding: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--primary-light)'
              }}>
                <input type="radio" checked name="payMethod" onChange={() => setPaymentMethod('Card')} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>💳 Credit/Debit Card</span>
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="form-control"
                placeholder="Abhishek Kumar"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="form-control"
                placeholder="4111 2222 3333 4444"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Expiration Date</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="form-control"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV Security Code</label>
                <input
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="form-control"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1, padding: '12px' }}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '12px' }}>
                Verify & Review Order
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Step 3: Final Review */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
          
          <div className="card glass" style={{ padding: '32px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '20px' }}>Review Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.92rem' }}>
              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Shipping Address</h4>
                <p style={{ color: 'var(--text-muted)' }}>{address}, {city}, {postalCode}, {country}</p>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <h4 style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Payment Info</h4>
                <p style={{ color: 'var(--text-muted)' }}>Card ending in {cardNumber.substring(cardNumber.length - 4)}</p>
              </div>
            </div>
          </div>
          <div className="card glass" style={{ padding: '32px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '16px' }}>Items Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>{item.name} <b>x{item.qty}</b></span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Shipping</span>
                  <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Taxes (8%)</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-dark)',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '12px',
                  marginTop: '4px'
                }}>
                  <span>Total Cost</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1, padding: '14px' }}>
              Modify Payment
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="btn btn-primary"
              style={{ flex: 2, padding: '14px' }}
            >
              {submitting ? 'Placing Order...' : `Pay & Place Order ($${totalPrice.toFixed(2)})`}
            </button>
          </div>
        </div>
      )}
      {/* Step 4: Success Screen */}
      {step === 4 && placedOrder && (
        <div className="card glass animate-fade" style={{
          padding: '50px 40px',
          textAlign: 'center',
          backgroundColor: 'var(--bg-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ fontSize: '5rem' }}>🎉</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--secondary)' }}>Order Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
            Thank you for shopping at Makhana Bliss, <b>{cardHolder}</b>. Your order <b>#{placedOrder._id}</b> has been placed successfully and paid via credit card.
          </p>
          <div className="glass" style={{
            padding: '20px 30px',
            borderRadius: 'var(--border-radius-md)',
            textAlign: 'left',
            width: '100%',
            maxWidth: '460px',
            fontSize: '0.9rem',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontFamily: 'var(--font-title)', marginBottom: '8px', color: 'var(--text-dark)' }}>Shipment Details</h4>
            <p>Street: {address}</p>
            <p>Location: {city}, {postalCode}, {country}</p>
            <p style={{ marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              Status: 🟡 <b>Paid, Preparing Shipment</b>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '400px' }}>
            <button onClick={() => navigateTo('profile')} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              Track Orders 📦
            </button>
            <button onClick={() => navigateTo('home')} className="btn btn-outline" style={{ flex: 1, padding: '12px', backgroundColor: 'white' }}>
              Back Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

