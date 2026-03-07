import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/nestro-demo',
      component: () => import('../pages/NestroDemo.vue'),
    },
    {
      path: '/oil-tools-demo',
      component: () => import('../pages/OilToolDemo.vue'),
    },
  ],
});

export default router;
