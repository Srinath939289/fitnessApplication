import axiosInstance from './axiosInstance';

// Signup - Register a new user
export const signup = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
      weight: data.weight || null,
      height: data.height || null,
      goal: data.goal || null,
    });
    const { token, ...userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Signup API error', error.response || error.message || error);
    throw error.response?.data?.error || 'Signup failed';
  }
};

// Login - Authenticate user
export const login = async (email, password) => {
  try {
    console.log('API: Sending login request for email:', email);
    const response = await axiosInstance.post('/auth/login', { email, password });
    console.log('API: Login response received:', response.data);
    const { token, ...userData } = response.data;
    console.log('API: Storing token and user data');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('API: Data stored, returning userData:', userData);
    return userData;
  } catch (error) {
    console.error('Login API error', error.response || error.message || error);
    // Surface the server message when present, otherwise throw generic
    throw error.response?.data?.error || error.message || 'Login failed';
  }
};

// Logout - Clear user session
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};