import type { RouteRecordRaw } from 'vue-router'

const authRouter: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('../layouts/LandingLayout.vue'),
    meta: {
      guest: true,
    },
    children: [
      {
        path: 'signin',
        name: 'Auth.SignIn',
        component: () => import('@/views/landing/SignInView.vue'),
      },
    ],
  },
]

export { authRouter }
