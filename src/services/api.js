// API Service
// Centralized API service for making HTTP requests to the backend

import axios from 'axios';
import { API_URL, ENDPOINTS } from '../config/api.js';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 seconds timeout
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            if (status === 401) {
                // Unauthorized - clear token
                localStorage.removeItem('adminToken');
            }
            
            // Return error message from server if available, and include status code
            const errorMessage = data?.message || error.message;
            const enhancedError = new Error(errorMessage);
            enhancedError.status = status;
            return Promise.reject(enhancedError);
        } else if (error.request) {
            // Request made but no response received
            return Promise.reject(new Error('No response from server. Please check your connection.'));
        } else {
            // Something else happened
            return Promise.reject(error);
        }
    }
);

// API Service Methods
const apiService = {
    // ============ Authentication ============
    
    /**
     * Login as admin
     * @param {string} username - Admin username
     * @param {string} password - Admin password
     * @returns {Promise} Response with token and admin data
     */
    async login(username, password) {
        const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
            username,
            password
        });
        return response.data;
    },
    
    /**
     * Verify JWT token
     * @returns {Promise} Response with admin data
     */
    async verifyToken() {
        const response = await apiClient.get(ENDPOINTS.AUTH.VERIFY);
        return response.data;
    },
    
    /**
     * Get current admin profile
     * @returns {Promise} Response with admin profile
     */
    async getProfile() {
        const response = await apiClient.get(ENDPOINTS.AUTH.ME);
        return response.data;
    },
    
    // ============ Feedback ============
    
    /**
     * Get all feedback with optional filters
     * @param {Object} params - Query parameters (version, topic, status, limit, page)
     * @returns {Promise} Response with feedback list and pagination
     */
    async getFeedback(params = {}) {
        const response = await apiClient.get(ENDPOINTS.FEEDBACK.LIST, { params });
        return response.data;
    },
    
    /**
     * Get feedback by ID
     * @param {string} id - Feedback ID
     * @returns {Promise} Response with feedback details
     */
    async getFeedbackById(id) {
        const response = await apiClient.get(ENDPOINTS.FEEDBACK.GET_BY_ID(id));
        return response.data;
    },
    
    /**
     * Create new feedback
     * @param {Object} feedbackData - Feedback data
     * @param {string} feedbackData.name - User name
     * @param {string} feedbackData.email - User email (optional)
     * @param {string} feedbackData.version - App version
     * @param {string} feedbackData.topic - Topic (feedback, bug, enhancement)
     * @param {string} feedbackData.message - Feedback message
     * @param {string} feedbackData.recaptchaToken - reCAPTCHA token
     * @returns {Promise} Response with created feedback
     */
    async createFeedback(feedbackData) {
        const response = await apiClient.post(ENDPOINTS.FEEDBACK.CREATE, feedbackData);
        return response.data;
    },
    
    /**
     * Update feedback status (admin only)
     * @param {string} id - Feedback ID
     * @param {string} status - New status (pending, reviewed, resolved)
     * @returns {Promise} Response with updated feedback
     */
    async updateFeedbackStatus(id, status) {
        const response = await apiClient.patch(ENDPOINTS.FEEDBACK.UPDATE_STATUS(id), {
            status
        });
        return response.data;
    },
    
    /**
     * Delete feedback (admin only)
     * @param {string} id - Feedback ID
     * @returns {Promise} Response confirming deletion
     */
    async deleteFeedback(id) {
        const response = await apiClient.delete(ENDPOINTS.FEEDBACK.DELETE(id));
        return response.data;
    },
    
    // ============ Comments ============
    
    /**
     * Get comments for a feedback
     * @param {string} feedbackId - Feedback ID
     * @returns {Promise} Response with comments list
     */
    async getComments(feedbackId) {
        const response = await apiClient.get(ENDPOINTS.COMMENTS.LIST(feedbackId));
        return response.data;
    },
    
    /**
     * Create comment on feedback (admin only)
     * @param {string} feedbackId - Feedback ID
     * @param {Object} commentData - Comment data
     * @param {string} commentData.name - Commenter name
     * @param {string} commentData.message - Comment message
     * @param {string} commentData.recaptchaToken - reCAPTCHA token
     * @returns {Promise} Response with created comment
     */
    async createComment(feedbackId, commentData) {
        const response = await apiClient.post(ENDPOINTS.COMMENTS.CREATE(feedbackId), commentData);
        return response.data;
    },
    
    /**
     * Delete comment (admin only)
     * @param {string} id - Comment ID
     * @returns {Promise} Response confirming deletion
     */
    async deleteComment(id) {
        const response = await apiClient.delete(ENDPOINTS.COMMENTS.DELETE(id));
        return response.data;
    },
    
    // ============ Health Check ============
    
    /**
     * Check API health status
     * @returns {Promise} Response with health status
     */
    async healthCheck() {
        const response = await apiClient.get(ENDPOINTS.HEALTH);
        return response.data;
    }
};

export default apiService;
