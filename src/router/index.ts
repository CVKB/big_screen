import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 使用 type-only import
import HomeIndex from '../views/HomeIndex.vue'
import NewHome from '../views/NewHome.vue'
import IndexView from '../views/IndexView.vue'
import Three from '../views/ThreeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: NewHome,
  },
  {
    path: '/index1',
    name: 'index1',
    component: HomeIndex,
  },
  {
    path: '/index2',
    name: 'index2',
    component: IndexView,
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