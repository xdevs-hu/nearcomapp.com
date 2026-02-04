<template>
    <div class="feature-graphic">
        <div class="header">
            <div class="logo-container" v-html="logoContent"></div>
        </div>

        <div class="svg-container">
            <div class="svg-wrapper">
                <div v-html="svgContent" :key="svgKey"></div>
            </div>
        </div>
    </div>
</template>

<script>
// SVG parts split for obfuscation - assembled at runtime
const svgParts = {
    logo: {
        a: '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1322.303" color-interpolation-filters="sRGB" viewBox="79.118 74.928 181.764 100.145"><g fill="#41b883" class="icon-text-wrapper icon-svg-group iconsvg">',
        b: '<g class="iconsvg-imagesvg" transform="translate(140 76.71)"><path fill="none" d="M0 0h60v60.001H0z" class="image-rect"></path>',
        c: '<svg width="60" height="60.001" class="image-svg-svg primary" filter="url(#colors4900483383)" style="overflow:visible"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" fill="#000" viewBox="10 10 80 80.001">',
        d: '<path d="M83.333 90c0-18.408-14.925-33.333-33.333-33.333S16.667 71.592 16.667 90H10c0-22.09 17.91-40 40-40s40 17.91 40 40zM56.667 10c0 18.408 14.925 33.334 33.333 33.334V50c-22.09 0-40-17.91-40-40z"></path>',
        e: '<circle cx="80" cy="20" r="10"></circle><circle cx="50" cy="76.668" r="13.333"></circle><circle cx="26.667" cy="26.667" r="16.667"></circle></svg></svg>',
        f: '<defs><filter id="colors4900483383"><feColorMatrix class="icon-feColorMatrix" values="0 0 0 0 0.20703125 0 0 0 0 0.28515625 0 0 0 0 0.3671875 0 0 0 1 0"></feColorMatrix></filter></defs></g>',
        g: '<path d="M92.8 172.88H80.9v-3.46l3.06-.59V148.2l-3.06-.6v-3.47h8.9l12.52 19.94.12-.02V148.2l-3.67-.6v-3.47h11.91v3.47l-3.09.6v24.68h-5.56l-12.8-19.75-.12.02v15.68l3.69.59zm30.14.41q-3.06 0-5.35-1.35t-3.55-3.72q-1.25-2.37-1.25-5.41v-.79q0-3.18 1.18-5.64 1.19-2.46 3.35-3.87t5.11-1.39q2.9 0 4.87 1.14 1.98 1.15 3 3.3 1.03 2.15 1.03 5.21v3.14h-12.56l-.04.12q.12 1.41.7 2.5.59 1.1 1.65 1.72 1.07.62 2.59.62 1.58 0 2.95-.4 1.37-.41 2.68-1.2l1.56 3.56q-1.33 1.06-3.33 1.76t-4.59.7M118.75 160l.06.1h7.13v-.51q0-1.3-.35-2.24-.34-.94-1.1-1.45-.76-.52-1.97-.52-1.14 0-1.93.61-.79.6-1.24 1.64-.44 1.05-.6 2.37m22.4 13.29q-3.18 0-5.06-1.7-1.88-1.71-1.88-4.65 0-2.02 1.1-3.54t3.24-2.39 5.28-.87h2.83v-1.58q0-1.54-.9-2.5-.9-.95-2.7-.95-.93 0-1.67.22-.74.23-1.33.65l-.45 2.82h-4.15l-.08-5.55q1.68-.95 3.63-1.54 1.96-.59 4.37-.59 4.18 0 6.61 1.94 2.43 1.95 2.43 5.56v8.81q0 .43.01.86.01.42.07.82l2.23.31v3.46h-7.15q-.21-.55-.43-1.18-.22-.64-.32-1.27-1.02 1.3-2.42 2.08-1.39.78-3.26.78m1.54-4.26q1.2 0 2.29-.54 1.08-.55 1.68-1.44v-3.37h-2.85q-1.89 0-2.87.87t-.98 2.09q0 1.15.72 1.77t2.01.62m25.83 3.85h-11.3v-3.46l2.77-.59v-13.25l-3.07-.59v-3.48h8.44l.21 2.65.04.47q.79-1.73 1.96-2.62 1.16-.89 2.78-.89.52 0 1.13.09t1.08.22l-.61 5.32-2.86-.16q-1.23-.06-1.99.41-.76.48-1.35 1.37v10.46l2.77.59zm19.31.41q-4.19 0-7.29-1.74-3.1-1.75-4.79-4.96-1.68-3.21-1.68-7.59v-.97q0-4.19 1.62-7.42 1.63-3.22 4.66-5.06 3.02-1.84 7.18-1.84 2.93 0 5.48.83 2.56.83 4.57 2.53v6.95h-4.28l-.59-4.36q-.65-.48-1.42-.81-.77-.34-1.67-.52-.9-.17-1.95-.17-2.45 0-4.2 1.2-1.76 1.21-2.7 3.41t-.94 5.22V159q0 3.02.99 5.23t2.8 3.43q1.82 1.21 4.31 1.21 1.24 0 2.5-.29 1.25-.28 2.28-.74l.59-4.04h4.28v6.87q-1.67 1.1-4.18 1.86t-5.57.76m22.73 0q-3.16 0-5.43-1.38t-3.48-3.84q-1.2-2.46-1.2-5.66V162q0-3.18 1.2-5.64 1.21-2.46 3.47-3.85t5.4-1.39q3.18 0 5.43 1.39t3.46 3.84q1.2 2.45 1.2 5.65v.41q0 3.2-1.2 5.66-1.21 2.46-3.46 3.84t-5.39 1.38m0-4.42q1.5 0 2.45-.81t1.4-2.26.45-3.39V162q0-1.9-.45-3.35t-1.41-2.27-2.48-.82q-1.48 0-2.45.82t-1.41 2.27q-.45 1.45-.45 3.35v.41q0 1.94.45 3.4.44 1.46 1.41 2.26t2.49.8m23.42 4.01h-11.02v-3.46l2.79-.59v-13.25l-3.09-.59v-3.48h8.44l.23 2.83q1.03-1.54 2.58-2.38t3.58-.84q2.06 0 3.53.91 1.47.9 2.2 2.74.99-1.72 2.57-2.68 1.58-.97 3.71-.97 3.16 0 4.99 2.15 1.82 2.15 1.82 6.56v9l2.79.59v3.46h-11.04v-3.46l2.49-.59v-9.02q0-2.37-.78-3.29t-2.26-.92q-1.35 0-2.27.76-.93.76-1.35 2.01v10.46l2.33.59v3.46h-10.4v-3.46l2.33-.59v-9.02q0-2.31-.78-3.26t-2.3-.95q-1.23 0-2.12.49-.89.5-1.46 1.43v11.31l2.49.59z" class="tp-name iconsvg-namesvg"></path></g></svg>'
    },
    common: {
        header: '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500"><path fill="#f7fafc" d="M0 0h1024v500H0z"></path>',
        defs: '<defs><linearGradient id="primaryGradient" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#2f855a;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#38a169;stop-opacity:1"></stop></linearGradient><linearGradient id="secondaryGradient" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#2d3748;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#4a5568;stop-opacity:1"></stop></linearGradient><linearGradient id="accentGradient" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" style="stop-color:#68d391;stop-opacity:.3"></stop><stop offset="50%" style="stop-color:#38a169;stop-opacity:.5"></stop><stop offset="100%" style="stop-color:#68d391;stop-opacity:.3"></stop></linearGradient><linearGradient id="waveGradient" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" style="stop-color:#2f855a;stop-opacity:.2"></stop><stop offset="50%" style="stop-color:#38a169;stop-opacity:.6"></stop><stop offset="100%" style="stop-color:#2f855a;stop-opacity:.2"></stop></linearGradient></defs>',
        bg: '<path fill="url(#accentGradient)" d="M0 350q256-50 512 0t512 0v150H0Z" opacity=".3"></path><path fill="url(#accentGradient)" d="M0 400q256-30 512 0t512 0v100H0Z" opacity=".2"></path>',
        visual: '<g id="visualContent" transform="translate(570 100)"><g id="centralDevice"><circle cx="200" cy="150" r="50" fill="url(#primaryGradient)" opacity=".2"></circle><circle cx="200" cy="150" r="40" fill="url(#primaryGradient)"></circle><rect width="30" height="40" x="185" y="135" fill="#fff" rx="3"></rect><rect width="24" height="30" x="188" y="138" fill="#2d3748" rx="1"></rect><circle cx="200" cy="172" r="2" fill="#fff"></circle></g><g id="device1"><circle cx="80" cy="50" r="35" fill="url(#secondaryGradient)" opacity=".15"></circle><circle cx="80" cy="50" r="28" fill="#68d391"></circle><circle cx="80" cy="45" r="8" fill="#fff"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3" d="M65 60q15-8 30 0"></path></g><g id="device2"><circle cx="320" cy="50" r="35" fill="url(#secondaryGradient)" opacity=".15"></circle><circle cx="320" cy="50" r="28" fill="#68d391"></circle><circle cx="320" cy="45" r="8" fill="#fff"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3" d="M305 60q15-8 30 0"></path></g><g id="device3"><circle cx="80" cy="250" r="35" fill="url(#secondaryGradient)" opacity=".15"></circle><circle cx="80" cy="250" r="28" fill="#68d391"></circle><circle cx="80" cy="245" r="8" fill="#fff"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3" d="M65 260q15-8 30 0"></path></g><g id="device4"><circle cx="320" cy="250" r="35" fill="url(#secondaryGradient)" opacity=".15"></circle><circle cx="320" cy="250" r="28" fill="#68d391"></circle><circle cx="320" cy="245" r="8" fill="#fff"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3" d="M305 260q15-8 30 0"></path></g><g id="connections" fill="none" stroke="url(#waveGradient)" stroke-linecap="round" stroke-width="4" opacity=".6"><path d="M110 70q45 40 65 60"></path><path d="M290 70q-45 40-65 60"></path><path d="M110 230q45-40 65-60"></path><path d="M290 230q-45-40-65-60"></path></g><g id="signals" fill="none" stroke-dasharray="5 5" stroke-width="2" opacity=".4"><circle cx="200" cy="150" r="60" stroke="#2f855a"></circle><circle cx="200" cy="150" r="75" stroke="#38a169"></circle><circle cx="200" cy="150" r="90" stroke="#68d391"></circle></g><g id="chatBubbles"><g transform="translate(130 90)"><rect width="50" height="30" fill="#2f855a" rx="8"></rect><path fill="#2f855a" d="m10 30 5 5 5-5z"></path><path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M10 12h30M10 20h20"></path></g><g transform="translate(220 90)"><rect width="50" height="30" fill="#38a169" rx="8"></rect><path fill="#38a169" d="m40 30-5 5-5-5z"></path><path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M10 12h30M20 20h20"></path></g></g><g id="connectivityIcons"><g transform="translate(150 200)"><path fill="none" stroke="#2f855a" stroke-linecap="round" stroke-width="3" d="M0 20q10-10 20 0"></path><path fill="none" stroke="#2f855a" stroke-linecap="round" stroke-width="3" d="M-5 15q15-15 30 0" opacity=".7"></path><path fill="none" stroke="#2f855a" stroke-linecap="round" stroke-width="3" d="M-10 10q20-20 40 0" opacity=".4"></path><circle cx="10" cy="23" r="2" fill="#2f855a"></circle></g><path fill="none" stroke="#38a169" stroke-width="3" d="M240 200v25l10-10-10-10 10-10-10 5"></path></g></g>',
        footer: '<path fill="url(#primaryGradient)" d="M0 490h1024v10H0z"></path></svg>'
    },
    text: {
        en: {
            title: '<g><text x="60" y="120" fill="#2d3748" font-family="Arial, sans-serif" font-size="48" font-weight="bold">Nearby Community</text>',
            subtitle: '<text x="60" y="165" fill="#4a5568" font-family="Arial, sans-serif" font-size="26" font-weight="500">Connect &amp; Chat Nearby</text>',
            desc: '<text x="60" y="200" fill="#718096" font-family="Arial, sans-serif" font-size="19" font-weight="400">Peer-to-peer messaging without internet</text>',
            badges: '<g id="featureBadges" transform="translate(60 240)"><rect width="140" height="40" fill="#2f855a" rx="20"></rect><text x="70" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">WiFi Direct</text><rect width="130" height="40" x="155" fill="#38a169" rx="20"></rect><text x="220" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Bluetooth</text><rect width="150" height="40" x="300" fill="#68d391" rx="20"></rect><text x="375" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">No Internet</text></g></g>'
        },
        hu: {
            title: '<g><text x="60" y="120" fill="#2d3748" font-family="Arial, sans-serif" font-size="48" font-weight="bold">Közeli Közösség</text>',
            subtitle: '<text x="60" y="165" fill="#4a5568" font-family="Arial, sans-serif" font-size="26" font-weight="500">Csatlakozz és csevegj a közelben</text>',
            desc: '<text x="60" y="200" fill="#718096" font-family="Arial, sans-serif" font-size="19" font-weight="400">Peer-to-peer üzenetküldés internet nélkül</text>',
            badges: '<g id="featureBadges" transform="translate(60 240)"><rect width="140" height="40" fill="#2f855a" rx="20"></rect><text x="70" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">WiFi Direct</text><rect width="130" height="40" x="155" fill="#38a169" rx="20"></rect><text x="220" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Bluetooth</text><rect width="150" height="40" x="300" fill="#68d391" rx="20"></rect><text x="375" y="26" fill="#fff" font-family="Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">Internet nélkül</text></g></g>'
        }
    }
};

// Assembly functions
const assembleLogo = () => {
    const p = svgParts.logo;
    return p.a + p.b + p.c + p.d + p.e + p.f + p.g;
};

const assembleFeatureGraphic = (locale) => {
    const c = svgParts.common;
    const t = svgParts.text[locale] || svgParts.text.en;
    return c.header + c.defs + c.bg + t.title + t.subtitle + t.desc + t.badges + c.visual + c.footer;
};

export default {
    name: 'FeatureGraphic',
    data() {
        return {
            svgContent: '',
            logoContent: '',
            svgKey: 0,
            currentLocale: this.$i18n?.locale || 'en'
        }
    },
    methods: {
        updateSVG() {
            this.svgContent = assembleFeatureGraphic(this.currentLocale);
            this.svgKey++;
        },
        updateLogo() {
            this.logoContent = assembleLogo();
        }
    },
    watch: {
        '$i18n.locale'(newLocale) {
            this.currentLocale = newLocale;
            this.updateSVG();
        }
    },
    mounted() {
        this.updateLogo();
        this.updateSVG();
        
        // Polling fallback for reactivity issues
        this._localeCheckInterval = setInterval(() => {
            if (this.$i18n.locale !== this.currentLocale) {
                this.currentLocale = this.$i18n.locale;
                this.updateSVG();
            }
        }, 100);
    },
    beforeUnmount() {
        if (this._localeCheckInterval) {
            clearInterval(this._localeCheckInterval);
        }
    }
}
</script>

<style scoped>
.feature-graphic {
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.logo-container :deep(svg) {
    width: auto;
    height: 120px;
    max-width: 600px;
}

.svg-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.svg-wrapper {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(72, 184, 120, 0.2);
    background: #1A202C;
    border: 1px solid rgba(72, 184, 120, 0.2);
}

.svg-wrapper :deep(svg) {
    width: 100%;
    height: auto;
    display: block;
}

@media (max-width: 768px) {
    .logo-container :deep(svg) {
        height: 100px;
        max-width: 500px;
    }
}

@media (max-width: 480px) {
    .logo-container :deep(svg) {
        height: 80px;
        max-width: 400px;
    }
}
</style>
