<template>
    <div class="language-switcher">
        <button 
            class="lang-btn" 
            :class="{ active: currentLocale === 'en' }" 
            @click="changeLocale('en')"
        >
            EN
        </button>
        <button 
            class="lang-btn" 
            :class="{ active: currentLocale === 'hu' }" 
            @click="changeLocale('hu')"
        >
            HU
        </button>
    </div>
</template>

<script>
export default {
    name: 'LanguageSwitcher',
    data() {
        return {
            currentLocale: this.$i18n.locale
        }
    },
    methods: {
        changeLocale(locale) {
            this.currentLocale = locale;
            this.$i18n.locale = locale;
            // Store preference in localStorage
            localStorage.setItem('preferredLocale', locale);
        }
    },
    mounted() {
        // Check if user has a stored preference
        const storedLocale = localStorage.getItem('preferredLocale');
        if (storedLocale && (storedLocale === 'en' || storedLocale === 'hu')) {
            this.currentLocale = storedLocale;
            this.$i18n.locale = storedLocale;
        } else {
            // Use the browser-detected locale
            this.currentLocale = this.$i18n.locale;
        }
    }
}
</script>

<style scoped>
.language-switcher {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
}

.lang-btn {
    padding: 8px 16px;
    border: 2px solid #4A5568;
    border-radius: 6px;
    background: rgba(74, 85, 104, 0.3);
    color: #E2E8F0;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.lang-btn:hover {
    background: rgba(74, 85, 104, 0.5);
    border-color: #68D391;
    transform: translateY(-2px);
}

.lang-btn.active {
    background: #48B878;
    color: #E2E8F0;
    border-color: #48B878;
}

@media (max-width: 480px) {
    .language-switcher {
        top: 10px;
        right: 10px;
        gap: 5px;
    }

    .lang-btn {
        padding: 6px 12px;
        font-size: 0.85rem;
    }
}
</style>
