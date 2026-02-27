import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';

const app = createApp(App);

app.use(i18n);
app.use(router);

// Configure reCAPTCHA v3
// IMPORTANT: Replace 'YOUR_RECAPTCHA_SITE_KEY' with your actual Google reCAPTCHA v3 site key
// Get your site key from: https://www.google.com/recaptcha/admin
app.use(VueReCaptcha, {
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // This is a test key - replace with your actual key
    loaderOptions: {
        autoHideBadge: false,
        explicitRenderParameters: {
            badge: 'bottomright'
        }
    }
});

app.mount('#app');
