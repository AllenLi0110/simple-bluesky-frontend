import type { RouteRecordRaw } from 'vue-router'

const homeRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/AppLayout.vue'),
    meta: {
      authenticated: true,
    },
    children: [
      {
        path: '',
        name: 'Home.Main',
        component: () => import('../views/Home.vue'),
      },
    ],
  },
]

export { homeRouter }
