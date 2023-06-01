// router - intex.ts
// append import
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Home',
    component: () => import('@/views/index.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () =>
  //     import('@/views/login/login.vue'),
  //   meta: { title: '登录', showNavbar: false },
  // },
  // append new router
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router