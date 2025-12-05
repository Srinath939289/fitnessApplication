import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { getWorkoutPlan } from '../api/plans';

const Workout = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const workoutPlan = await getWorkoutPlan(user.id);
          setPlan(workoutPlan);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [user]);

  if (loading) return <div className="loading">Loading workout plan...</div>;
  if (error) return <div className="error">Error loading plan: {error}</div>;

  return (
    <div className="workout-container">
      <h2>Your Workout Plan</h2>
      {plan ? (
        <div className="plan-content">
          <h3>{plan.name}</h3>
          <p><strong>Goal:</strong> {plan.goal}</p>
          <p><strong>Level:</strong> {plan.level}</p>
          <p><strong>Duration:</strong> {plan.duration_weeks} weeks</p>

          <div className="plan-details">
            <h4>Weekly Schedule:</h4>
            <ul>
              {plan.details?.weekly?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h4>Notes:</h4>
            <p>{plan.details?.notes}</p>
          </div>
        </div>
      ) : (
        <p>No workout plan available. Please update your profile.</p>
      )}
    </div>
  );
};

export default Workout;
