import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 使用 type-only import
import HomeIndex from '../views/HomeIndex.vue'
import HeadView from '../views/HeadView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeIndex,
  },
  {
    path: '/head',
    name: 'head',
    component: HeadView,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;