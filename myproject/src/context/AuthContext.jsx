import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser, getUserById, updateUser } from '../services/api';

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
      // Try to get user from API if we have user ID in localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser?.id) {
          try {
            // Try to fetch fresh user data from API
            const freshUser = await getUserById(parsedUser.id);
            setUser(freshUser);
            localStorage.setItem('user', JSON.stringify(freshUser));
            return;
          } catch (apiError) {
            // If API call fails, use cached data
            console.warn('Could not fetch user from API, using cached data:', apiError);
            setUser(parsedUser);
          }
        } else {
          setUser(parsedUser);
        }
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
      const response = await loginUser({ email, password });
      handleAuthSuccess(response);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data || 'Something went wrong while signing in.',
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await signupUser(userData);
      handleAuthSuccess(response);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.response?.data || 'Something went wrong while signing up.',
      };
    }
  };

  const handleAuthSuccess = (response) => {
    const { token: authToken, user: authUser } = response;
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(authUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates) => {
    if (!user?.id) {
      console.error('Cannot update profile: no user ID');
      return { success: false, error: 'User not found' };
    }

    try {
      const updatedUser = await updateUser(user.id, updates);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: error.response?.data || 'Failed to update profile',
      };
    }
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

