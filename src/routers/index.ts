import { authRouter } from './auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { homeRouter } from './home'
import { useAuthStore } from '../stores/auths'

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
  await authStore.status()
  if (to.meta.guest && authStore.isAuthenticated) {
    return next({ name: 'Home.Main' })
  }
  if (to.meta.authenticated && !authStore.isAuthenticated) {
    return next({
      name: 'Auth.SignIn',
      query: { redirect: to.fullPath },
    })
  }
  return next()
})

export default router
