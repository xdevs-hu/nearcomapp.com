<template>
    <div class="privacy-page">
        <div class="privacy-header">
            <router-link to="/" class="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ $t('title') }}
            </router-link>
            <h1>{{ $t('privacyPolicy.title') }}</h1>
            <p class="last-updated">{{ $t('privacyPolicy.lastUpdated') }}</p>
        </div>

        <div class="privacy-content">
            <!-- Introduction -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.intro.title') }}</h2>
                <p>{{ $t('privacyPolicy.intro.content') }}</p>
            </section>

            <!-- Data Collection -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.dataCollection.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.dataCollection.content') }}</p>
            </section>

            <!-- Permissions -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.permissions.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.permissions.content') }}</p>
            </section>

            <!-- Data Usage -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.dataUsage.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.dataUsage.content') }}</p>
            </section>

            <!-- Data Storage -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.dataStorage.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.dataStorage.content') }}</p>
            </section>

            <!-- Data Sharing -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.dataSharing.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.dataSharing.content') }}</p>
            </section>

            <!-- Security -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.security.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.security.content') }}</p>
            </section>

            <!-- Children's Privacy -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.childrenPrivacy.title') }}</h2>
                <p>{{ $t('privacyPolicy.childrenPrivacy.content') }}</p>
            </section>

            <!-- Your Rights -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.yourRights.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.yourRights.content') }}</p>
            </section>

            <!-- Third Party -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.thirdParty.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.thirdParty.content') }}</p>
            </section>

            <!-- International -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.international.title') }}</h2>
                <p>{{ $t('privacyPolicy.international.content') }}</p>
            </section>

            <!-- Changes -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.changes.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.changes.content') }}</p>
            </section>

            <!-- Compliance -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.compliance.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.compliance.content') }}</p>
            </section>

            <!-- Contact -->
            <section class="privacy-section">
                <h2>{{ $t('privacyPolicy.contact.title') }}</h2>
                <p class="whitespace-pre-line">{{ $t('privacyPolicy.contact.content') }}</p>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Privacy'
}
</script>

<style scoped>
.privacy-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #E2E8F0;
}

.privacy-header {
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

.privacy-header h1 {
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

.privacy-content {
    background: #1A202C;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(72, 184, 120, 0.1);
}

.privacy-section {
    margin-bottom: 32px;
}

.privacy-section:last-child {
    margin-bottom: 0;
}

.privacy-section h2 {
    font-size: 20px;
    font-weight: bold;
    color: #48B878;
    margin: 0 0 12px 0;
}

.privacy-section p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(226, 232, 240, 0.87);
    margin: 0;
    text-align: justify;
}

.whitespace-pre-line {
    white-space: pre-line;
}

@media (max-width: 768px) {
    .privacy-page {
        padding: 15px;
    }

    .privacy-content {
        padding: 25px;
    }

    .privacy-header h1 {
        font-size: 28px;
    }

    .privacy-section h2 {
        font-size: 18px;
    }

    .privacy-section p {
        font-size: 15px;
    }
}

@media (max-width: 480px) {
    .privacy-page {
        padding: 10px;
    }

    .privacy-content {
        padding: 20px;
        border-radius: 15px;
    }

    .privacy-header h1 {
        font-size: 24px;
    }

    .privacy-section h2 {
        font-size: 16px;
    }

    .privacy-section p {
        font-size: 14px;
    }
}
</style>
