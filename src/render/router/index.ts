import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import USER from './user'
const routes: Array<RouteRecordRaw> = [
  ...USER,
  {
    path: '/homePage',
    name: 'homePage',
    alias: '/',
    meta: {
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "notice" */ '@/render/views/home/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/render/views/404.vue')
  },
  {
    path: '/*',
    redirect: { name: '404' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
