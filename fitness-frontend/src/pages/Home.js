import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to Fitness Application</h1>
        <p>Your personal fitness journey starts here</p>
        
        {user ? (
          <div className="cta-buttons">
            <button onClick={() => navigate("/workout")}>View Workout Plan</button>
            <button onClick={() => navigate("/diet")}>View Diet Plan</button>
            <button onClick={() => navigate("/shop")}>Shop Products</button>
          </div>
        ) : (
          <div className="cta-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        )}
      </div>

      {user && (
        <div className="user-welcome">
          <h2>Welcome, {user.name}! 👋</h2>
          <p>You are logged in. Choose an option from the menu above to get started.</p>
          <div className="quick-info">
            <div className="info-card">
              <h3>📋 Your Profile</h3>
              <p>Email: {user.email}</p>
              {user.weight && <p>Weight: {user.weight} kg</p>}
              {user.height && <p>Height: {user.height} cm</p>}
              {user.goal && <p>Goal: {user.goal}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
