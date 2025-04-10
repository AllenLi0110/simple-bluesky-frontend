import { authRouter } from './auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { homeRouter } from './home'
import { useAuthStore } from '../stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Home.Main',
    },
  },
  ...authRouter,
  ...homeRouter,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  if (to.meta.authenticated && !authStore.isAuthenticated) {
    next({
      name: 'Auth.SignIn',
      query: { redirect: to.fullPath },
    })
    return
  }
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Home.Main' })
    return
  }
  next()
})

export default router
