import { createRouter, createWebHistory } from 'vue-router';
import FeatureGraphic from '../components/FeatureGraphic.vue';
import Privacy from '../views/Privacy.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: FeatureGraphic
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;
