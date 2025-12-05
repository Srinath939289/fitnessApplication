import React from 'react';

const DietPlan = ({ plan }) => {
  if (!plan) return <p>No diet plan available. Update your profile with weight, height, and goal.</p>;

  return (
    <div className="plan-card diet-plan">
      <h4>🍎 {plan.name}</h4>
      <p><strong>Goal:</strong> {plan.goal}</p>
      <p><strong>Target Calories:</strong> {plan.calories_per_day} kcal/day</p>
      <h5>Meal Breakdown:</h5>
      <ul>
        {Object.entries(plan.details || {}).map(([meal, description]) => (
          <li key={meal}><strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {description}</li>
        ))}
      </ul>
      <p><em>Disclaimer: Consult a professional before starting any new diet.</em></p>
    </div>
  );
};

export default DietPlan;