import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5065/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (isteğe token eklemek için - gelecekte kullanılabilir)
api.interceptors.request.use(
  (config) => {
    // Token varsa header'a ekle
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (hata yönetimi için)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Sunucu hatası
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      console.error('Network Error:', error.request);
    } else {
      // İstek hazırlanırken hata oluştu
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== BLOG API ====================

/**
 * Tüm blogları getir
 */
export const getBlogs = async () => {
  try {
    const response = await api.get('/blog');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Tek blog getir (ID ile)
 */
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Yeni blog oluştur
 */
export const createBlog = async (blogData) => {
  try {
    const response = await api.post('/blog', blogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Blog güncelle
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await api.put(`/blog/${id}`, blogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Blog sil
 */
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ==================== USER API ====================

/**
 * Tüm kullanıcıları getir
 */
export const getUsers = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Tek kullanıcı getir (ID ile)
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Email ile kullanıcı getir
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/user/email/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Yeni kullanıcı oluştur
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Kullanıcı güncelle
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Kullanıcı sil
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Kullanıcı aktif/pasif durumunu değiştir
 */
export const toggleUserActive = async (id) => {
  try {
    const response = await api.patch(`/user/${id}/activate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Default export
export default api;

