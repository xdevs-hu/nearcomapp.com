<template>
    <button @click="navigateToFeedback" class="feedback-button" :title="$t('feedback.buttonText')">
        <span class="feedback-icon">💬</span>
        <span class="feedback-text">{{ $t('feedback.buttonText') }}</span>
        <span class="feedback-pulse"></span>
    </button>
</template>

<script>
export default {
    name: 'FeedbackButton',
    methods: {
        navigateToFeedback() {
            this.$router.push('/feedback');
        }
    }
}
</script>

<style scoped>
.feedback-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    padding: 16px 28px;
    background: linear-gradient(135deg, #48B878 0%, #68D391 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(72, 184, 120, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    animation: slideInUp 0.6s ease-out;
}

.feedback-button:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 35px rgba(72, 184, 120, 0.6);
}

.feedback-button:active {
    transform: translateY(-3px) scale(1.02);
}

.feedback-icon {
    font-size: 1.4rem;
    animation: bounce 2s infinite;
}

.feedback-text {
    font-weight: 700;
    letter-spacing: 0.5px;
}

.feedback-pulse {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 3px solid #68D391;
    animation: pulse 2s infinite;
    pointer-events: none;
}

@keyframes slideInUp {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}

/* Responsive design */
@media (max-width: 768px) {
    .feedback-button {
        bottom: 20px;
        right: 20px;
        padding: 14px 24px;
        font-size: 1rem;
    }

    .feedback-icon {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .feedback-button {
        bottom: 15px;
        right: 15px;
        padding: 12px 20px;
        font-size: 0.95rem;
    }

    .feedback-text {
        display: none;
    }

    .feedback-icon {
        font-size: 1.5rem;
    }

    .feedback-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        justify-content: center;
        padding: 0;
    }
}

/* Dark mode support - already optimized for dark backgrounds */
@media (prefers-color-scheme: light) {
    .feedback-button {
        box-shadow: 0 8px 25px rgba(72, 184, 120, 0.3);
    }

    .feedback-button:hover {
        box-shadow: 0 12px 35px rgba(72, 184, 120, 0.5);
    }
}
</style>
