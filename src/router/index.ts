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
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/warning',
        name: 'Warning',
        component: () => import('@/views/warning/index.vue')
      },
      {
        path: '/prevention',
        name: 'Prevention',
        component: () => import('@/views/prevention/index.vue')
      },
      {
        path: '/cultural',
        name: 'Cultural',
        component: () => import('@/views/cultural/index.vue')
      },
      {
        path: '/medic',
        name: 'Medic',
        component: () => import('@/views/medic/index.vue')
      },
      {
        path: '/education',
        name: 'Education',
        component: () => import('@/views/education/index.vue')
      },
    ]
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