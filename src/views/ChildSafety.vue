<template>
    <div class="csae-page">
        <div class="csae-header">
            <router-link to="/" class="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ $t('title') }}
            </router-link>
            <h1>{{ $t('childSafety.title') }}</h1>
            <p class="last-updated">{{ $t('childSafety.lastUpdated') }}</p>
        </div>

        <div class="csae-content">
            <!-- Introduction -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.intro.title') }}</h2>
                <p>{{ $t('childSafety.intro.content') }}</p>
            </section>

            <!-- Our Commitment -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.commitment.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.commitment.content') }}</p>
            </section>

            <!-- Age Requirements -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.ageRequirements.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.ageRequirements.content') }}</p>
            </section>

            <!-- Safety Features -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.safetyFeatures.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.safetyFeatures.content') }}</p>
            </section>

            <!-- Content Moderation -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.contentModeration.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.contentModeration.content') }}</p>
            </section>

            <!-- Reporting Mechanisms -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.reporting.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.reporting.content') }}</p>
            </section>

            <!-- Privacy Protection -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.privacyProtection.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.privacyProtection.content') }}</p>
            </section>

            <!-- Prohibited Content -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.prohibitedContent.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.prohibitedContent.content') }}</p>
            </section>

            <!-- Parental Guidance -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.parentalGuidance.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.parentalGuidance.content') }}</p>
            </section>

            <!-- Contact Information -->
            <section class="csae-section contact-section">
                <h2>{{ $t('childSafety.contact.title') }}</h2>
                <p>{{ $t('childSafety.contact.content') }}</p>
                
                <div class="contact-card">
                    <div class="contact-item">
                        <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="contact-details">
                            <span class="contact-label">{{ $t('childSafety.contact.emailLabel') }}</span>
                            <span class="contact-value">{{ $t('childSafety.contact.emailValue') }}</span>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="contact-details">
                            <span class="contact-label">{{ $t('childSafety.contact.websiteLabel') }}</span>
                            <span class="contact-value">{{ $t('childSafety.contact.websiteValue') }}</span>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="contact-details">
                            <span class="contact-label">{{ $t('childSafety.contact.responseTimeLabel') }}</span>
                            <span class="contact-value">{{ $t('childSafety.contact.responseTimeValue') }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Emergency Resources -->
            <section class="csae-section">
                <h2>{{ $t('childSafety.emergencyResources.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('childSafety.emergencyResources.content') }}</p>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChildSafety'
}
</script>

<style scoped>
.csae-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #E2E8F0;
}

.csae-header {
    margin-bottom: 40px;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #48B878;
    text-decoration: none;
    font-size: 16px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 8px;
}

.back-button:hover {
    background: rgba(72, 184, 120, 0.1);
    transform: translateX(-4px);
}

.back-button svg {
    width: 20px;
    height: 20px;
}

.csae-header h1 {
    font-size: 36px;
    font-weight: bold;
    color: #48B878;
    margin: 0 0 10px 0;
}

.last-updated {
    font-size: 14px;
    color: rgba(226, 232, 240, 0.6);
    font-style: italic;
    margin: 0;
}

.csae-content {
    background: #1A202C;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(72, 184, 120, 0.1);
}

.csae-section {
    margin-bottom: 32px;
}

.csae-section:last-child {
    margin-bottom: 0;
}

.csae-section h2 {
    font-size: 20px;
    font-weight: bold;
    color: #48B878;
    margin: 0 0 12px 0;
}

.csae-section p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(226, 232, 240, 0.87);
    margin: 0;
    text-align: justify;
}

.whitespace-pre-line {
    white-space: pre-line;
}

/* Contact Section Styles */
.contact-section {
    background: rgba(72, 184, 120, 0.05);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.contact-card {
    margin-top: 20px;
    background: rgba(26, 32, 44, 0.6);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(72, 184, 120, 0.15);
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
}

.contact-item:not(:last-child) {
    border-bottom: 1px solid rgba(226, 232, 240, 0.1);
}

.contact-icon {
    color: #48B878;
    flex-shrink: 0;
    margin-top: 2px;
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.contact-label {
    font-size: 13px;
    color: rgba(226, 232, 240, 0.6);
    font-weight: 500;
}

.contact-value {
    font-size: 15px;
    color: rgba(226, 232, 240, 0.95);
    font-weight: 600;
    word-break: break-word;
}

@media (max-width: 768px) {
    .csae-page {
        padding: 15px;
    }

    .csae-content {
        padding: 25px;
    }

    .csae-header h1 {
        font-size: 28px;
    }

    .csae-section h2 {
        font-size: 18px;
    }

    .csae-section p {
        font-size: 15px;
    }

    .contact-section {
        padding: 20px;
    }

    .contact-card {
        padding: 16px;
    }
}

@media (max-width: 480px) {
    .csae-page {
        padding: 10px;
    }

    .csae-content {
        padding: 20px;
        border-radius: 15px;
    }

    .csae-header h1 {
        font-size: 24px;
    }

    .csae-section h2 {
        font-size: 16px;
    }

    .csae-section p {
        font-size: 14px;
    }

    .contact-section {
        padding: 16px;
    }

    .contact-card {
        padding: 12px;
    }

    .contact-item {
        padding: 10px 0;
    }

    .contact-label {
        font-size: 12px;
    }

    .contact-value {
        font-size: 14px;
    }
}
</style>
