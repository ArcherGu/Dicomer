import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home/index.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// config router
export function setupRouter(app: App) {
    app.use(router);
}

export default router;
