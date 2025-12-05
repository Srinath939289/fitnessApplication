import React from 'react';
import { useAuth } from '../App';
import { createOrder, buildOrderItems } from '../api/orders';

const Cart = ({ items, onRemove }) => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    if (items.length === 0) {
      alert('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderItems = buildOrderItems(items);
      const result = await createOrder(user.id, orderItems);
      setMessage(`✅ Order created! Order ID: ${result.orderId}, Total: Rs. ${result.total}`);
      alert(`Order successful! Order ID: ${result.orderId}`);
      // Clear cart by removing all items
      items.forEach(item => onRemove(item.id));
    } catch (error) {
      setMessage(`❌ Checkout failed: ${error}`);
      alert(`Checkout failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <h3>🛒 Shopping Cart</h3>
      
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-grid">
            {items.map((item) => (
              <div key={item.id} className="cart-item-card">
                <h4>{item.name}</h4>
                <p className="item-description">{item.description}</p>
                <p className="item-price">Price: Rs. {item.price}</p>
                <div className="quantity-section">
                  <p>Quantity: <span className="quantity-badge">{item.quantity}</span></p>
                  <p className="item-total">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove from Cart</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-total">
              <h4>Total Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</h4>
              <h3>Grand Total: Rs. {total.toFixed(2)}</h3>
            </div>
            <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>

          {message && <p className="cart-message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
