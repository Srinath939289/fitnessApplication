import React, { useState } from "react";
import { useAuth } from "../App";

const Dashboard = () => {
  const { user } = useAuth();
  const [userStats] = useState({
    weight: user?.weight || 0,
    height: user?.height || 0,
    goal: user?.goal || "general",
  });

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}!</h2>

      <div className="dashboard-grid">
        <div className="stats-card">
          <h3>Profile Information</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Weight:</strong> {userStats.weight || "Not set"} kg</p>
          <p><strong>Height:</strong> {userStats.height || "Not set"} cm</p>
          <p><strong>Goal:</strong> {userStats.goal}</p>
        </div>

        <div className="stats-card">
          <h3>Quick Stats</h3>
          {userStats.weight && userStats.height ? (
            <>
              <p>
                <strong>BMI:</strong>{" "}
                {(
                  userStats.weight /
                  ((userStats.height / 100) * (userStats.height / 100))
                ).toFixed(1)}
              </p>
              <p><strong>Status:</strong> Account Active</p>
            </>
          ) : (
            <p>Complete your profile to see more stats</p>
          )}
        </div>

        <div className="stats-card">
          <h3>Available Plans</h3>
          <ul>
            <li> Personalized Workout Plan</li>
            <li> Custom Diet Plan</li>
            <li> Progress Tracking</li>
            <li> AI Chatbot Support</li>
          </ul>
        </div>

        <div className="stats-card">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/workout">View Workout Plan</a></li>
            <li><a href="/diet">View Diet Plan</a></li>
            <li><a href="/shop">Browse Products</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
