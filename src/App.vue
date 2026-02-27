<template>
    <div id="app">
        <LanguageSwitcher />
        <FeedbackButton v-if="$route.path !== '/feedback'" />
        <div class="container fade-in">
            <router-view />
        </div>
    </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import FeedbackButton from './components/FeedbackButton.vue';

export default {
    name: 'App',
    components: {
        LanguageSwitcher,
        FeedbackButton
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #121212;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

#app {
    width: 100%;
    max-width: 1200px;
}

.container {
    background: #1A202C;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    padding: 40px;
    transition: transform 0.3s ease;
    border: 1px solid rgba(72, 184, 120, 0.1);
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(72, 184, 120, 0.15);
}

@media (max-width: 768px) {
    .container {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }

    .container {
        padding: 15px;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}
</style>
