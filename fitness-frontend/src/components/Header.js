import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/', { replace: true });
    // Clear browser history
    window.history.pushState(null, null, '/');
    window.addEventListener('popstate', () => {
      navigate('/', { replace: true });
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            💪 Fitness App
          </div>
          <nav className="navbar">
            <ul>
              {user ? (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/workout">Workout Plans</Link></li>
                  <li><Link to="/diet">Diet Plans</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li className="user-info">Welcome, {user.name}!</li>
                  <li className="cart-icon-container">
                    <Link to="/cart" title="View Cart">
                      <button className="cart-icon">
                        🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
