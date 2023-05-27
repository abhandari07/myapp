// src/api.js

import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'http://localhost:4000/api/', // Please replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default api;

// Export specific API calls

export const registerUser = async (userData) => {
  return await api.post('/users/register', userData);
};

export const loginUser = async (userData) => {
  return await api.post('/users/login', userData);
};
