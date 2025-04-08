import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 使用 type-only import
import HomeIndex from '../views/HomeIndex.vue'
import Three from '../views/ThreeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeIndex,
  },
  {
    path: '/three',
    name: 'three',
    component: Three,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;