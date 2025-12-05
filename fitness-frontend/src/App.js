import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as AuthApi from './api/auth';
import './App.css';

// --- PAGES ---
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import CartPage from './pages/Cart';
import Workout from './pages/Workout';
import Diet from './pages/Diet';

// --- COMPONENTS ---
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// --- CONTEXT ---
import { CartProvider } from './context/CartContext';

// --- Auth Context Setup ---
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthApi.getCurrentUser());

  const signIn = async (email, password) => {
    const userData = await AuthApi.login(email, password);
    setUser(userData);
    return userData;
  };

  const signUp = async (data) => {
    const userData = await AuthApi.signup(data);
    setUser(userData);
    return userData;
  };

  const signOut = () => {
    AuthApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

// --- Main App Component ---
const App = () => {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
};

// --- App Content Component ---
const AppContent = () => {
  const location = useLocation();

  // Show chatbot only on specific pages
  const showChatbot =
    location.pathname === '/' ||
    location.pathname === '/shop' ||
    location.pathname === '/workout' ||
    location.pathname === '/diet';

  return (
    <>
      <Header />
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workout"
              element={
                <ProtectedRoute>
                  <Workout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diet"
              element={
                <ProtectedRoute>
                  <Diet />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {showChatbot && (
          <div className="chatbot-fixed">
            <Chatbot />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
