import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function WhatsAppFloatingButton() {
  const { cartItems, totalPrice, itemsPrice, shippingPrice, taxPrice, shippingAddress } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  const phone = '916207503187'; // Business WhatsApp number

  let text = '';
  if (cartItems && cartItems.length > 0) {
    // Dynamic Cart Booking Template (Clean text format)
    text = 
      `*MAKHANA BLISS - NEW ORDER BOOKING*\n` +
      `----------------------------------------\n\n` +
      `*CUSTOMER INFO:*\n` +
      `- Name: ${userInfo ? userInfo.name : '[Please enter your name]'}\n` +
      `- Delivery Address: ${
        shippingAddress && shippingAddress.address 
          ? `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
          : '[Please enter your delivery address]'
      }\n` +
      `- Email: ${userInfo ? userInfo.email : '[Please enter your email]'}\n\n` +
      `*ORDER DETAILS:*\n` +
      cartItems.map((item, idx) => {
        if (item.isCustom) {
          const shares = Object.entries(item.customDetails.shares || {})
            .map(([flavor, pct]) => `${flavor} (${pct}%)`)
            .join(', ');
          return `${idx + 1}. *Custom Mix: ${item.name}* (Qty: ${item.qty})\n   - Flavors: ${shares}\n   - Price: $${(item.price * item.qty).toFixed(2)}`;
        }
        return `${idx + 1}. *${item.name}* (Qty: ${item.qty})\n   - Price: $${(item.price * item.qty).toFixed(2)}`;
      }).join('\n') + `\n\n` +
      `----------------------------------------\n` +
      `*SUMMARY:*\n` +
      `- Subtotal: $${itemsPrice.toFixed(2)}\n` +
      `- Shipping: ${shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}\n` +
      `- Tax (8%): $${taxPrice.toFixed(2)}\n` +
      `- *Total Payable: $${totalPrice.toFixed(2)}*\n\n` +
      `- *Preferred Payment:* [Cash on Delivery / UPI / Card]\n` +
      `----------------------------------------\n` +
      `Please confirm my order and share the payment details. Thank you!`;
  } else {
    // Attractive General Booking Template (Clean text format)
    text =
      `*MAKHANA BLISS - ORDER ENQUIRY*\n` +
      `----------------------------------------\n\n` +
      `Hello Makhana Bliss! I would like to place an order for fresh roasted fox nuts:\n\n` +
      `*REQUESTED FLAVORS & QUANTITIES:*\n` +
      `- Cheddar Cheese: [e.g., 2 bags]\n` +
      `- Peri-Peri Spicy: [e.g., 1 bag]\n` +
      `- Sweet Caramel: [e.g., 1 bag]\n` +
      `- Tangy Tomato: [e.g., 0 bags]\n` +
      `- Himalayan Salted: [e.g., 0 bags]\n\n` +
      `*MY DETAILS:*\n` +
      `- Name: ${userInfo ? userInfo.name : '[Your Name]'}\n` +
      `- Delivery Address: ${
        shippingAddress && shippingAddress.address 
          ? `${shippingAddress.address}, ${shippingAddress.city}`
          : '[Your City/Address]'
      }\n` +
      `- Phone: [Your Contact Number]\n\n` +
      `- *Preferred Payment:* [Cash on Delivery / UPI / Card]\n` +
      `----------------------------------------\n` +
      `Please let me know the total price and next steps. Thank you!`;
  }

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn-pulse"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.12) translateY(-4px)';
        const tooltip = e.currentTarget.querySelector('.whatsapp-tooltip');
        if (tooltip) tooltip.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        const tooltip = e.currentTarget.querySelector('.whatsapp-tooltip');
        if (tooltip) tooltip.style.opacity = '0.9';
      }}
      title="Book Order on WhatsApp"
    >
      <img 
        src="/images/whatsapp.png" 
        alt="WhatsApp" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '50%'
        }} 
      />
      
      {/* Tooltip Badge */}
      <div 
        className="whatsapp-tooltip"
        style={{
          position: 'absolute',
          right: '74px',
          backgroundColor: '#2F2B27',
          color: '#FAF8F5',
          padding: '8px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0.9,
          border: '1px solid #EFEBE4',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'opacity 0.2s ease'
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#25D366' }} />
        {cartItems && cartItems.length > 0 ? `Book Order ($${totalPrice.toFixed(2)}) 💬` : 'Book via WhatsApp 💬'}
      </div>
    </a>
  );
}
