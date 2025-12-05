import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              Fitness Application helps you achieve your health and fitness goals
              with personalized workout plans, diet recommendations, and AI coaching.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li><a href="/">Workout Plans</a></li>
              <li><a href="/">Diet Plans</a></li>
              <li><a href="/">AI Coach</a></li>
              <li><a href="/">Shop</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@fitnessapp.com</p>
            <p>Phone: 1-800-FITNESS</p>
            <p>Address: 123 Fitness Street, Health City</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Fitness Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
