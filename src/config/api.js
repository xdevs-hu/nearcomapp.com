// API Configuration
// This file contains the API base URL configuration

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
    // Check if running in production (GitHub Pages)
    if (import.meta.env.PROD) {
        // Production API URL - update this with your actual production API URL
        return import.meta.env.VITE_API_BASE_URL || 'https://api.nearcomapp.com';
    }
    
    // Development API URL
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_VERSION = '/api/v1';
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// API Endpoints
export const ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        VERIFY: '/auth/verify',
        ME: '/auth/me'
    },
    
    // Feedback endpoints
    FEEDBACK: {
        LIST: '/feedback',
        CREATE: '/feedback',
        GET_BY_ID: (id) => `/feedback/${id}`,
        UPDATE_STATUS: (id) => `/feedback/${id}/status`,
        DELETE: (id) => `/feedback/${id}`
    },
    
    // Comment endpoints
    COMMENTS: {
        CREATE: (feedbackId) => `/feedback/${feedbackId}/comments`,
        LIST: (feedbackId) => `/feedback/${feedbackId}/comments`,
        DELETE: (id) => `/comments/${id}`
    },
    
    // Health check
    HEALTH: '/health'
};

export default {
    API_BASE_URL,
    API_VERSION,
    API_URL,
    ENDPOINTS
};
