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
    // Token varsa kullanıcı bilgilerini yükle
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      // Token'dan kullanıcı bilgilerini çıkar (JWT decode edilebilir veya API'den alınabilir)
      // Şimdilik localStorage'dan alıyoruz, backend hazır olduğunda API'den alınacak
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
      // TODO: Backend hazır olduğunda bu kısım güncellenecek
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // Şimdilik mock data
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
        error: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      // TODO: Backend hazır olduğunda bu kısım güncellenecek
      // const response = await api.post('/auth/signup', userData);
      // const { token, user } = response.data;
      
      // Şimdilik mock data
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
        error: error.response?.data?.message || 'Kayıt olurken bir hata oluştu.' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

