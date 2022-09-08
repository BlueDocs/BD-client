import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router';
import { routes, RoutesMap } from './routes.config';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router, useRoute, useRouter, RoutesMap };
