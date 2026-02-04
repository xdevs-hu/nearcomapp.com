import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import hu from './locales/hu.json';

// Detect browser language
function getBrowserLocale() {
    const browserLocale = navigator.language || navigator.userLanguage;
    
    // Check if browser language starts with 'hu' (e.g., 'hu', 'hu-HU')
    if (browserLocale.toLowerCase().startsWith('hu')) {
        return 'hu';
    }
    
    // Default to English
    return 'en';
}

const i18n = createI18n({
    locale: getBrowserLocale(),
    fallbackLocale: 'en',
    messages: {
        en,
        hu
    }
});

export default i18n;
