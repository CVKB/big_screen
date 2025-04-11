import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // 使用 type-only import
import HomeIndex from '../views/old/HomeIndex.vue'
import NewHome from '../views/SbuView.vue'
import IndexView from '../views/IndexView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
  },
  {
    path: '/index_old',
    name: 'index1',
    component: HomeIndex,
  },
  {
    path: '/sub',
    name: 'sub',
    component: NewHome,
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
