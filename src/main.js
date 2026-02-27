import { createApp } from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

const app = createApp(App);

app.use(i18n);
app.use(router);

// Initialize reCAPTCHA v3
app.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    loaderOptions: {
        autoHideBadge: false,
        explicitRenderParameters: {
            badge: 'bottomleft'
        }
    }
});

app.mount('#app');
