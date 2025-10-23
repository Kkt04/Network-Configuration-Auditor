/**
 * API Service
 * Handles all API calls to backend
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * Upload and analyze configuration file
 */
export const uploadConfigFile = async (file) => {
  const formData = new FormData();
  formData.append('configFile', file);

  const response = await api.post('/audit/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

/**
 * Get audit result by ID
 */
export const getAuditResult = async (id) => {
  const response = await api.get(`/audit/results/${id}`);
  return response.data;
};

/**
 * Get audit history
 */
export const getAuditHistory = async (limit = 10) => {
  const response = await api.get(`/audit/history?limit=${limit}`);
  return response.data;
};

/**
 * Delete audit result
 */
export const deleteAuditResult = async (id) => {
  const response = await api.delete(`/audit/results/${id}`);
  return response.data;
};

/**
 * Download audit report
 */
export const downloadReport = (id, format = 'json') => {
  const url = `${API_URL}/audit/download/${id}?format=${format}`;
  window.open(url, '_blank');
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response;
};

export default api;