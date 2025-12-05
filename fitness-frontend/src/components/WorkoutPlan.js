import React from 'react';

const WorkoutPlan = ({ plan }) => {
  if (!plan) return <p>No workout plan available. Update your profile with weight, height, and goal.</p>;

  return (
    <div className="plan-card workout-plan">
      <h4>🏋️ {plan.name}</h4>
      <p><strong>Goal:</strong> {plan.goal}</p>
      <p><strong>Level:</strong> {plan.level}</p>
      <p><strong>Duration:</strong> {plan.duration_weeks} weeks</p>
      <h5>Weekly Schedule:</h5>
      <ul>
        {plan.details?.weekly?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p><strong>Note:</strong> <em>{plan.details?.notes}</em></p>
    </div>
  );
};

export default WorkoutPlan;