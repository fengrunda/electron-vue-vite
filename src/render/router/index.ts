import { h } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  icon?: JSX.Element
  name?: string
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/render/pages/home/index.vue'),
    meta: {
      icon: h('el-icon', h('home-filled')),
      name: '首页',
    },
  },
  {
    path: '/about',
    component: () => import('@/render/pages/about/index.vue'),
    meta: {
      icon: h('el-icon', h('user')),
      name: '关于作者',
    },
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(), // 这里使用 hash 模式，确保打包后正常加载
})
