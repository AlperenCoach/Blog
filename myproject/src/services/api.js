import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5065/api';

// Create a configured axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (ready to attach tokens when auth is wired up)
api.interceptors.request.use(
  (config) => {
    // Attach token to every request if it exists
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

// Response interceptor for centralized error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was sent but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something went wrong before the request was sent
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== BLOG API ====================

/**
 * Fetch all blogs
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
 * Fetch a single blog by id
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
 * Create a new blog
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
 * Update an existing blog
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
 * Delete a blog
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
 * Fetch all users
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
 * Fetch a single user by id
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
 * Fetch user by email
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
 * Create a new user
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
 * Update an existing user
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
 * Delete a user
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
 * Toggle user active/passive state
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

