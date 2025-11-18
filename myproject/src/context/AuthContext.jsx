import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Load the user when we already have a token
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      // Ideally decode the token or call the API; for now fall back to localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // TODO: Replace with real API call when backend auth is ready
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // Temporary mock implementation
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        email: email,
        username: email.split('@')[0],
      };

      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Something went wrong while signing in.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      // TODO: Replace with real API call when backend auth is ready
      // const response = await api.post('/auth/signup', userData);
      // const { token, user } = response.data;
      
      // Temporary mock implementation
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: Date.now().toString(),
        email: userData.email,
        username: userData.username,
      };

      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Something went wrong while signing up.' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const nextUser = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

