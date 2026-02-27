<template>
    <div class="feedback-page">
        <div class="feedback-header">
            <h1 class="feedback-title">{{ $t('feedback.title') }}</h1>
            <p class="feedback-subtitle">{{ $t('feedback.subtitle') }}</p>
            <p class="feedback-description">{{ $t('feedback.description') }}</p>
        </div>

        <div v-if="!submitted" class="feedback-form">
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
                    rows="8"
                    required
                ></textarea>
            </div>

            <div v-if="error" class="error-message">
                {{ $t('feedback.errorMessage') }}
            </div>

            <div class="form-actions">
                <button @click="goBack" class="btn btn-secondary">
                    {{ $t('feedback.cancelButton') }}
                </button>
                <button @click="submitFeedback" class="btn btn-primary">
                    {{ $t('feedback.submitButton') }}
                </button>
            </div>

            <div class="contact-info">
                <p>{{ $t('feedback.contactEmail') }}</p>
            </div>
        </div>

        <div v-else class="success-container">
            <div class="success-icon">✓</div>
            <h2 class="success-title">{{ $t('feedback.successMessage') }}</h2>
            <button @click="goBack" class="btn btn-primary">
                {{ $t('feedback.cancelButton') }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Feedback',
    data() {
        return {
            email: '',
            message: '',
            error: false,
            submitted: false
        }
    },
    methods: {
        submitFeedback() {
            if (!this.message.trim()) {
                this.error = true;
                return;
            }

            this.error = false;

            // Create mailto link with feedback
            const subject = encodeURIComponent('Nearby Community Feedback');
            const body = encodeURIComponent(
                `Email: ${this.email || 'Not provided'}\n\nMessage:\n${this.message}`
            );
            const mailtoLink = `mailto:${this.$t('feedback.contactEmail')}?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            this.submitted = true;

            // Reset form after delay
            setTimeout(() => {
                this.email = '';
                this.message = '';
                this.submitted = false;
            }, 3000);
        },
        goBack() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.feedback-page {
    color: #E2E8F0;
    max-width: 700px;
    margin: 0 auto;
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

.feedback-form {
    background: rgba(45, 55, 72, 0.5);
    border-radius: 15px;
    padding: 30px;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.form-group {
    margin-bottom: 25px;
}

.form-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #E2E8F0;
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
    min-height: 150px;
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
    margin-top: 30px;
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

.btn-primary {
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    color: white;
}

.btn-primary:hover {
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

.contact-info {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid rgba(72, 184, 120, 0.2);
    text-align: center;
    color: #A0AEC0;
    font-size: 0.9rem;
}

.success-container {
    text-align: center;
    padding: 60px 30px;
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
    margin-bottom: 30px;
    font-weight: 600;
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

@media (max-width: 768px) {
    .feedback-title {
        font-size: 2rem;
    }

    .feedback-subtitle {
        font-size: 1.1rem;
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
}

@media (max-width: 480px) {
    .feedback-title {
        font-size: 1.6rem;
    }

    .feedback-subtitle {
        font-size: 1rem;
    }

    .feedback-description {
        font-size: 0.9rem;
    }
}
</style>
