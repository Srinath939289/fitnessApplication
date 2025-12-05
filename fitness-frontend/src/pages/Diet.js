import React, { useState, useEffect } from "react";
import { useAuth } from "../App";
import { getDietPlan } from "../api/plans";

const Diet = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const dietPlan = await getDietPlan(user.id);
          setPlan(dietPlan);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [user]);

  if (loading) return <div className="loading">Loading diet plan...</div>;
  if (error) return <div className="error">Error loading plan: {error}</div>;

  return (
    <div className="diet-container">
      <h2>Your Diet Plan</h2>
      {plan ? (
        <div className="plan-content">
          <h3>{plan.name}</h3>
          <p><strong>Goal:</strong> {plan.goal}</p>
          <p><strong>Daily Calories:</strong> {plan.calories_per_day} kcal</p>

          <div className="meal-plan">
            <h4>Daily Meals:</h4>
            <div className="meals">
              {plan.details && Object.entries(plan.details).map(([meal, description]) => (
                <div key={meal} className="meal-item">
                  <h5>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</h5>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="nutritional-info">
            <h4>Nutritional Guidelines:</h4>
            <p>- Protein: 1.6-2.2g per kg of body weight</p>
            <p>- Balance carbs and healthy fats</p>
            <p>- Drink plenty of water (8-10 glasses/day)</p>
          </div>
        </div>
      ) : (
        <p>No diet plan available. Please update your profile.</p>
      )}
    </div>
  );
};

export default Diet;
