import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-page-container">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty!</p>
          <Link to="/shop">
            <button>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <h4>{item.name}</h4>
                <p className="item-description">{item.description}</p>
                <p className="item-price">Price: Rs. {item.price}</p>
                <div className="quantity-section">
                  <p>Quantity: <span className="quantity-badge">{item.quantity}</span></p>
                  <p className="item-total">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-total">
              <h4>Order Summary</h4>
              <h3>
                Total: Rs.{" "}
                {cartItems
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </h3>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
