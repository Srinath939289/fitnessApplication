import React, { useEffect } from 'react';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect to login after signup or to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async (data) => {
    try {
      await signUp(data);
      // Signup will update user state, triggering redirect to home
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSignupSuccess = () => {
    // After success message, sign out and redirect to login
    // We'll clear the user state without using signOut to avoid localStorage issues
    navigate('/login', { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <SignupForm onSubmit={handleSignup} onSuccess={handleSignupSuccess} />
      </div>
    </div>
  );
};

export default Signup;