import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  // If already logged in, redirect to the original destination (if any) or home
  useEffect(() => {
    if (user) {
      const dest = location.state?.from?.pathname || '/';
      console.log('User logged in, redirecting to:', dest, user);
      navigate(dest, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting login with email:', email);
      await signIn(email, password);
      // After sign-in, navigate to original destination (if present) or home.
      const dest = location.state?.from?.pathname || '/';
      console.log('Sign in completed, navigating to:', dest);
      navigate(dest, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;