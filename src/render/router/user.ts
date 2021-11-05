import { RouteRecordRaw } from 'vue-router'
const routers: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '我的'
    },
    component: () => import(/* webpackChunkName: "user" */ '@/render/views/user/index.vue')
  }
]
export default routers
