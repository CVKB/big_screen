import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 使用 type-only import
import DataDashboard from '@/views/DataDashboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'DataDashboard',
    component: DataDashboard,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;