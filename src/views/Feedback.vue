<template>
    <div class="feedback-page">
        <div class="feedback-header">
            <h1 class="feedback-title">{{ $t('feedback.title') }}</h1>
            <p class="feedback-subtitle">{{ $t('feedback.subtitle') }}</p>
            <p class="feedback-description">{{ $t('feedback.description') }}</p>
        </div>

        <!-- Filter Section -->
        <div class="filter-section">
            <div class="filter-group">
                <label class="filter-label">{{ $t('feedback.filterByVersion') }}</label>
                <select v-model="filterVersion" @change="loadFeedback" class="filter-select">
                    <option value="">{{ $t('feedback.allVersions') }}</option>
                    <option v-for="version in versions" :key="version" :value="version">
                        {{ version }}
                    </option>
                </select>
            </div>
            <div class="filter-group">
                <label class="filter-label">{{ $t('feedback.filterByTopic') }}</label>
                <select v-model="filterTopic" @change="loadFeedback" class="filter-select">
                    <option value="">{{ $t('feedback.allTopics') }}</option>
                    <option value="feedback">{{ $t('feedback.topicFeedback') }}</option>
                    <option value="bug">{{ $t('feedback.topicBug') }}</option>
                    <option value="enhancement">{{ $t('feedback.topicEnhancement') }}</option>
                </select>
            </div>
        </div>

        <!-- Add Message Form -->
        <div v-if="!submitted" class="feedback-form">
            <h2 class="form-title">{{ $t('feedback.addMessage') }}</h2>
            
            <div class="form-group">
                <label for="name" class="form-label">{{ $t('feedback.nameLabel') }} *</label>
                <input
                    id="name"
                    v-model="name"
                    type="text"
                    class="form-input"
                    :placeholder="$t('feedback.namePlaceholder')"
                    required
                />
            </div>

            <div class="form-group">
                <label for="version" class="form-label">{{ $t('feedback.versionLabel') }} *</label>
                <select
                    id="version"
                    v-model="version"
                    class="form-input"
                    required
                >
                    <option value="">{{ $t('feedback.selectVersion') }}</option>
                    <option v-for="ver in versions" :key="ver" :value="ver">
                        {{ ver }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="topic" class="form-label">{{ $t('feedback.topicLabel') }} *</label>
                <select
                    id="topic"
                    v-model="topic"
                    class="form-input"
                    required
                >
                    <option value="">{{ $t('feedback.selectTopic') }}</option>
                    <option value="feedback">{{ $t('feedback.topicFeedback') }}</option>
                    <option value="bug">{{ $t('feedback.topicBug') }}</option>
                    <option value="enhancement">{{ $t('feedback.topicEnhancement') }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="email" class="form-label">{{ $t('feedback.emailLabel') }}</label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-input"
                    :placeholder="$t('feedback.emailPlaceholder')"
                />
            </div>

            <div class="form-group">
                <label for="message" class="form-label">{{ $t('feedback.messageLabel') }} *</label>
                <textarea
                    id="message"
                    v-model="message"
                    class="form-textarea"
                    :placeholder="$t('feedback.messagePlaceholder')"
                    rows="6"
                    required
                ></textarea>
            </div>

            <div v-if="error" class="error-message">
                {{ errorMessage }}
            </div>

            <div class="form-actions">
                <button @click="goBack" class="btn btn-secondary">
                    {{ $t('feedback.cancelButton') }}
                </button>
                <button @click="submitFeedback" class="btn btn-primary" :disabled="isSubmitting">
                    {{ isSubmitting ? $t('feedback.submitting') : $t('feedback.submitButton') }}
                </button>
            </div>

            <div class="recaptcha-notice">
                <p>{{ $t('feedback.recaptchaNotice') }}</p>
            </div>
        </div>

        <!-- Success Message -->
        <div v-else class="success-container">
            <div class="success-icon">✓</div>
            <h2 class="success-title">{{ $t('feedback.successMessage') }}</h2>
            <p class="success-description">{{ $t('feedback.successDescription') }}</p>
            <button @click="resetForm" class="btn btn-primary">
                {{ $t('feedback.addAnother') }}
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading feedback...</p>
        </div>

        <!-- Messages List -->
        <div v-else class="messages-section">
            <h2 class="messages-title">{{ $t('feedback.messagesTitle') }}</h2>
            <p class="messages-count">{{ messages.length }} {{ $t('feedback.messagesCount') }}</p>
            
            <div v-if="messages.length === 0" class="no-messages">
                <p>{{ $t('feedback.noMessages') }}</p>
            </div>

            <div v-else class="messages-list">
                <div
                    v-for="msg in messages"
                    :key="msg._id"
                    class="message-card"
                >
                    <div class="message-header">
                        <div class="message-author">
                            <div class="author-avatar">{{ msg.name.charAt(0).toUpperCase() }}</div>
                            <div class="author-info">
                                <span class="author-name">{{ msg.name }}</span>
                                <span class="message-date">{{ formatDateTime(msg.createdAt) }}</span>
                            </div>
                        </div>
                        <div class="message-tags">
                            <span class="tag tag-version">v{{ msg.version }}</span>
                            <span class="tag" :class="`tag-${msg.topic}`">
                                {{ $t(`feedback.topic${capitalize(msg.topic)}`) }}
                            </span>
                            <span class="tag" :class="`tag-status-${msg.status}`">
                                {{ msg.status }}
                            </span>
                        </div>
                    </div>
                    <div class="message-content">
                        {{ msg.message }}
                    </div>

                    <!-- Comments Section -->
                    <div class="comments-section">
                        <div class="comments-header">
                            <span class="comments-count">
                                {{ msg.comments?.length || 0 }} {{ $t('feedback.comments') }}
                            </span>
                            <button 
                                @click="toggleCommentForm(msg._id)" 
                                class="btn-comment"
                            >
                                {{ activeCommentForm === msg._id ? $t('feedback.hideCommentForm') : $t('feedback.addComment') }}
                            </button>
                        </div>

                        <!-- Comment Form -->
                        <div v-if="activeCommentForm === msg._id" class="comment-form">
                            <div class="form-group">
                                <label class="form-label">{{ $t('feedback.commentNameLabel') }} *</label>
                                <input
                                    v-model="commentForm.name"
                                    type="text"
                                    class="form-input"
                                    :placeholder="$t('feedback.commentNamePlaceholder')"
                                />
                            </div>

                            <div class="form-group">
                                <label class="form-label">{{ $t('feedback.adminPasswordLabel') }} *</label>
                                <input
                                    v-model="commentForm.password"
                                    type="password"
                                    class="form-input"
                                    :placeholder="$t('feedback.adminPasswordPlaceholder')"
                                />
                                <small class="form-hint">{{ $t('feedback.adminPasswordHint') }}</small>
                            </div>

                            <div class="form-group">
                                <label class="form-label">{{ $t('feedback.commentMessageLabel') }} *</label>
                                <textarea
                                    v-model="commentForm.message"
                                    class="form-textarea"
                                    :placeholder="$t('feedback.commentMessagePlaceholder')"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div v-if="commentError" class="error-message">
                                {{ commentErrorMessage }}
                            </div>

                            <div class="form-actions">
                                <button @click="cancelComment" class="btn btn-secondary btn-sm">
                                    {{ $t('feedback.cancelButton') }}
                                </button>
                                <button 
                                    @click="submitComment(msg._id)" 
                                    class="btn btn-primary btn-sm"
                                    :disabled="isSubmittingComment"
                                >
                                    {{ isSubmittingComment ? $t('feedback.submitting') : $t('feedback.postComment') }}
                                </button>
                            </div>
                        </div>

                        <!-- Comments List -->
                        <div v-if="msg.comments && msg.comments.length > 0" class="comments-list">
                            <div
                                v-for="comment in msg.comments"
                                :key="comment._id"
                                class="comment-item"
                            >
                                <div class="comment-header">
                                    <div class="comment-avatar">{{ comment.name.charAt(0).toUpperCase() }}</div>
                                    <div class="comment-info">
                                        <span class="comment-author">{{ comment.name }}</span>
                                        <span v-if="comment.isAdmin" class="admin-badge">{{ $t('feedback.adminBadge') }}</span>
                                        <span class="comment-date">{{ formatDateTime(comment.createdAt) }}</span>
                                    </div>
                                </div>
                                <div class="comment-content">
                                    {{ comment.message }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useReCaptcha } from 'vue-recaptcha-v3';
import apiService from '../services/api.js';

export default {
    name: 'Feedback',
    setup() {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
        return {
            executeRecaptcha,
            recaptchaLoaded
        };
    },
    data() {
        return {
            name: '',
            email: '',
            version: '',
            topic: '',
            message: '',
            error: false,
            errorMessage: '',
            submitted: false,
            isSubmitting: false,
            isLoading: false,
            filterVersion: '',
            filterTopic: '',
            versions: ['1.0.0', '1.0.1', '1.1.0', '1.2.0', '2.0.0'],
            activeCommentForm: null,
            commentForm: {
                name: '',
                password: '',
                message: ''
            },
            commentError: false,
            commentErrorMessage: '',
            isSubmittingComment: false,
            messages: [],
            adminToken: null
        };
    },
    methods: {
        async loadFeedback() {
            this.isLoading = true;
            try {
                const params = {};
                if (this.filterVersion) params.version = this.filterVersion;
                if (this.filterTopic) params.topic = this.filterTopic;
                
                const response = await apiService.getFeedback(params);
                
                if (response.success) {
                    this.messages = response.data.feedback || [];
                }
            } catch (error) {
                console.error('Failed to load feedback:', error);
                this.error = true;
                this.errorMessage = error.message || 'Failed to load feedback';
            } finally {
                this.isLoading = false;
            }
        },
        
        async submitFeedback() {
            // Validate required fields
            if (!this.name.trim()) {
                this.error = true;
                this.errorMessage = this.$t('feedback.errorName');
                return;
            }
            if (!this.version) {
                this.error = true;
                this.errorMessage = this.$t('feedback.errorVersion');
                return;
            }
            if (!this.topic) {
                this.error = true;
                this.errorMessage = this.$t('feedback.errorTopic');
                return;
            }
            if (!this.message.trim()) {
                this.error = true;
                this.errorMessage = this.$t('feedback.errorMessage');
                return;
            }

            this.error = false;
            this.isSubmitting = true;

            try {
                // Wait for reCAPTCHA to be loaded
                await this.recaptchaLoaded();
                
                // Execute reCAPTCHA
                const token = await this.executeRecaptcha('submit_feedback');
                
                // Submit feedback to API
                const feedbackData = {
                    name: this.name,
                    email: this.email || undefined,
                    version: this.version,
                    topic: this.topic,
                    message: this.message,
                    recaptchaToken: token
                };

                const response = await apiService.createFeedback(feedbackData);

                if (response.success) {
                    // Show success message
                    this.submitted = true;
                    
                    // Reload feedback list
                    await this.loadFeedback();
                }

            } catch (error) {
                console.error('Feedback submission error:', error);
                this.error = true;
                this.errorMessage = error.message || this.$t('feedback.errorRecaptcha');
            } finally {
                this.isSubmitting = false;
            }
        },
        
        toggleCommentForm(messageId) {
            if (this.activeCommentForm === messageId) {
                this.activeCommentForm = null;
                this.resetCommentForm();
            } else {
                this.activeCommentForm = messageId;
                this.resetCommentForm();
            }
        },
        
        async submitComment(feedbackId) {
            // Validate required fields
            if (!this.commentForm.name.trim()) {
                this.commentError = true;
                this.commentErrorMessage = this.$t('feedback.errorCommentName');
                return;
            }
            if (!this.commentForm.password.trim()) {
                this.commentError = true;
                this.commentErrorMessage = this.$t('feedback.errorCommentPassword');
                return;
            }
            if (!this.commentForm.message.trim()) {
                this.commentError = true;
                this.commentErrorMessage = this.$t('feedback.errorCommentMessage');
                return;
            }

            this.commentError = false;
            this.isSubmittingComment = true;

            try {
                // First, login as admin to get token
                const loginResponse = await apiService.login('admin', this.commentForm.password);
                
                if (loginResponse.success) {
                    // Store token temporarily
                    localStorage.setItem('adminToken', loginResponse.data.token);
                    
                    // Wait for reCAPTCHA to be loaded
                    await this.recaptchaLoaded();
                    
                    // Execute reCAPTCHA
                    const token = await this.executeRecaptcha('submit_comment');
                    
                    // Submit comment
                    const commentData = {
                        name: this.commentForm.name,
                        message: this.commentForm.message,
                        recaptchaToken: token
                    };

                    const response = await apiService.createComment(feedbackId, commentData);

                    if (response.success) {
                        // Reload feedback to show new comment
                        await this.loadFeedback();
                        
                        // Reset form
                        this.resetCommentForm();
                        this.activeCommentForm = null;
                    }
                    
                    // Clear token after use
                    localStorage.removeItem('adminToken');
                }

            } catch (error) {
                console.error('Comment submission error:', error);
                this.commentError = true;
                
                // Check if it's an authentication error
                if (error.message.includes('Invalid credentials') || error.message.includes('Unauthorized')) {
                    this.commentErrorMessage = this.$t('feedback.errorInvalidPassword');
                } else {
                    this.commentErrorMessage = error.message || this.$t('feedback.errorRecaptcha');
                }
                
                // Clear token on error
                localStorage.removeItem('adminToken');
            } finally {
                this.isSubmittingComment = false;
            }
        },
        
        cancelComment() {
            this.activeCommentForm = null;
            this.resetCommentForm();
        },
        
        resetCommentForm() {
            this.commentForm = {
                name: '',
                password: '',
                message: ''
            };
            this.commentError = false;
            this.commentErrorMessage = '';
        },
        
        resetForm() {
            this.name = '';
            this.email = '';
            this.version = '';
            this.topic = '';
            this.message = '';
            this.submitted = false;
            this.error = false;
            this.errorMessage = '';
        },
        
        goBack() {
            this.$router.push('/');
        },
        
        formatDateTime(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            // Format time
            const timeStr = date.toLocaleTimeString(this.$i18n.locale, { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            if (minutes < 1) {
                return this.$t('feedback.justNow');
            } else if (minutes < 60) {
                return `${minutes} ${this.$t('feedback.minutesAgo')} (${timeStr})`;
            } else if (hours < 24) {
                return `${hours} ${this.$t('feedback.hoursAgo')} (${timeStr})`;
            } else if (days === 0) {
                return `${this.$t('feedback.today')} ${timeStr}`;
            } else if (days === 1) {
                return `${this.$t('feedback.yesterday')} ${timeStr}`;
            } else if (days < 7) {
                return `${days} ${this.$t('feedback.daysAgo')} (${timeStr})`;
            } else {
                return date.toLocaleString(this.$i18n.locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        },
        
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    
    mounted() {
        // Load feedback when component mounts
        this.loadFeedback();
    }
};
</script>

<style scoped>
.feedback-page {
    color: #E2E8F0;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.feedback-header {
    text-align: center;
    margin-bottom: 40px;
}

.feedback-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.feedback-subtitle {
    font-size: 1.3rem;
    color: #68D391;
    margin-bottom: 15px;
    font-weight: 600;
}

.feedback-description {
    font-size: 1rem;
    color: #A0AEC0;
    line-height: 1.6;
}

/* Loading State */
.loading-container {
    text-align: center;
    padding: 60px 30px;
    background: rgba(45, 55, 72, 0.3);
    border-radius: 15px;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.loading-spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
    border: 4px solid rgba(72, 184, 120, 0.2);
    border-top-color: #48B878;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Filter Section */
.filter-section {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: rgba(45, 55, 72, 0.5);
    border-radius: 15px;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.filter-group {
    flex: 1;
}

.filter-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #E2E8F0;
}

.filter-select {
    width: 100%;
    padding: 10px 14px;
    background: rgba(26, 32, 44, 0.8);
    border: 2px solid #4A5568;
    border-radius: 8px;
    color: #E2E8F0;
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-select:focus {
    outline: none;
    border-color: #48B878;
    box-shadow: 0 0 0 3px rgba(72, 184, 120, 0.1);
}

/* Form Section */
.feedback-form {
    background: rgba(45, 55, 72, 0.5);
    border-radius: 15px;
    padding: 30px;
    border: 1px solid rgba(72, 184, 120, 0.2);
    margin-bottom: 40px;
}

.form-title {
    font-size: 1.5rem;
    color: #68D391;
    margin-bottom: 25px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #E2E8F0;
}

.form-hint {
    display: block;
    font-size: 0.85rem;
    color: #A0AEC0;
    margin-top: 5px;
    font-style: italic;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(26, 32, 44, 0.8);
    border: 2px solid #4A5568;
    border-radius: 8px;
    color: #E2E8F0;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #48B878;
    box-shadow: 0 0 0 3px rgba(72, 184, 120, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

.error-message {
    background: rgba(245, 101, 101, 0.1);
    border: 1px solid #F56565;
    color: #FC8181;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.95rem;
}

.form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 25px;
}

.btn {
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-sm {
    padding: 8px 20px;
    font-size: 0.9rem;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(72, 184, 120, 0.3);
}

.btn-secondary {
    background: rgba(74, 85, 104, 0.5);
    color: #E2E8F0;
    border: 2px solid #4A5568;
}

.btn-secondary:hover {
    background: rgba(74, 85, 104, 0.7);
    border-color: #68D391;
}

.btn-comment {
    padding: 6px 16px;
    background: rgba(72, 184, 120, 0.1);
    border: 1px solid rgba(72, 184, 120, 0.3);
    border-radius: 6px;
    color: #68D391;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-comment:hover {
    background: rgba(72, 184, 120, 0.2);
    border-color: rgba(72, 184, 120, 0.5);
}

.recaptcha-notice {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(72, 184, 120, 0.2);
    text-align: center;
    color: #A0AEC0;
    font-size: 0.85rem;
}

/* Success Container */
.success-container {
    text-align: center;
    padding: 60px 30px;
    background: rgba(45, 55, 72, 0.5);
    border-radius: 15px;
    border: 1px solid rgba(72, 184, 120, 0.2);
    margin-bottom: 40px;
}

.success-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 30px;
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    animation: scaleIn 0.5s ease-out;
}

.success-title {
    font-size: 1.8rem;
    color: #68D391;
    margin-bottom: 15px;
    font-weight: 600;
}

.success-description {
    font-size: 1rem;
    color: #A0AEC0;
    margin-bottom: 30px;
}

@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Messages Section */
.messages-section {
    margin-top: 40px;
}

.messages-title {
    font-size: 2rem;
    color: #68D391;
    margin-bottom: 10px;
    font-weight: 600;
}

.messages-count {
    font-size: 0.95rem;
    color: #A0AEC0;
    margin-bottom: 25px;
}

.no-messages {
    text-align: center;
    padding: 60px 30px;
    background: rgba(45, 55, 72, 0.3);
    border-radius: 15px;
    border: 1px dashed rgba(72, 184, 120, 0.3);
}

.no-messages p {
    color: #A0AEC0;
    font-size: 1.1rem;
}

.messages-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.message-card {
    background: rgba(45, 55, 72, 0.5);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(72, 184, 120, 0.2);
    transition: all 0.3s ease;
}

.message-card:hover {
    border-color: rgba(72, 184, 120, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 15px;
}

.message-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.author-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
}

.author-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.author-name {
    font-size: 1rem;
    font-weight: 600;
    color: #E2E8F0;
}

.message-date {
    font-size: 0.85rem;
    color: #A0AEC0;
}

.message-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.tag-version {
    background: rgba(66, 153, 225, 0.2);
    color: #63B3ED;
    border: 1px solid rgba(66, 153, 225, 0.3);
}

.tag-feedback {
    background: rgba(72, 184, 120, 0.2);
    color: #68D391;
    border: 1px solid rgba(72, 184, 120, 0.3);
}

.tag-bug {
    background: rgba(245, 101, 101, 0.2);
    color: #FC8181;
    border: 1px solid rgba(245, 101, 101, 0.3);
}

.tag-enhancement {
    background: rgba(159, 122, 234, 0.2);
    color: #B794F4;
    border: 1px solid rgba(159, 122, 234, 0.3);
}

.tag-status-pending {
    background: rgba(237, 137, 54, 0.2);
    color: #F6AD55;
    border: 1px solid rgba(237, 137, 54, 0.3);
}

.tag-status-reviewed {
    background: rgba(66, 153, 225, 0.2);
    color: #63B3ED;
    border: 1px solid rgba(66, 153, 225, 0.3);
}

.tag-status-resolved {
    background: rgba(72, 184, 120, 0.2);
    color: #68D391;
    border: 1px solid rgba(72, 184, 120, 0.3);
}

.message-content {
    font-size: 1rem;
    color: #E2E8F0;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 20px;
}

/* Comments Section */
.comments-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(72, 184, 120, 0.2);
}

.comments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.comments-count {
    font-size: 0.9rem;
    color: #A0AEC0;
    font-weight: 600;
}

.comment-form {
    background: rgba(26, 32, 44, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.comments-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
}

.comment-item {
    background: rgba(26, 32, 44, 0.5);
    border-radius: 10px;
    padding: 15px;
    border: 1px solid rgba(72, 184, 120, 0.15);
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.comment-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9F7AEA 0%, #B794F4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
}

.comment-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.comment-author {
    font-size: 0.9rem;
    font-weight: 600;
    color: #E2E8F0;
}

.admin-badge {
    padding: 2px 8px;
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    color: white;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
}

.comment-date {
    font-size: 0.8rem;
    color: #A0AEC0;
}

.comment-content {
    font-size: 0.95rem;
    color: #E2E8F0;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Responsive Design */
@media (max-width: 768px) {
    .feedback-title {
        font-size: 2rem;
    }

    .feedback-subtitle {
        font-size: 1.1rem;
    }

    .filter-section {
        flex-direction: column;
        gap: 15px;
    }

    .feedback-form {
        padding: 20px;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }

    .message-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .message-tags {
        width: 100%;
    }

    .comments-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .btn-comment {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .feedback-page {
        padding: 15px;
    }

    .feedback-title {
        font-size: 1.6rem;
    }

    .feedback-subtitle {
        font-size: 1rem;
    }

    .feedback-description {
        font-size: 0.9rem;
    }

    .messages-title {
        font-size: 1.5rem;
    }

    .comment-form {
        padding: 15px;
    }
}
</style>
