import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/common/login/login.vue'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/common/main/main.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/common/home/home.vue'),
        name: 'home',
        meta: { title: '首页' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
