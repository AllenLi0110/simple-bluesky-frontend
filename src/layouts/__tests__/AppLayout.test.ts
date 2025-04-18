import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import AppLayout from '../AppLayout.vue'
import { useAuthStore } from '../../stores/auths'

vi.mock('naive-ui', () => {
  const createStub = (name: string) => ({
    name,
    template: '<div><slot></slot></div>',
  })
  return {
    NLayout: createStub('NLayout'),
    NLayoutHeader: createStub('NLayoutHeader'),
    NLayoutContent: createStub('NLayoutContent'),
    NSpace: createStub('NSpace'),
    NButton: {
      name: 'NButton',
      props: ['type', 'ghost', 'text'],
      inheritAttrs: false,
      template: '<button v-bind="$attrs"><slot></slot></button>',
    },
  }
})

describe('AppLayout', () => {
  let router: ReturnType<typeof createRouter>
  const mountWithRouterAndPinia = () =>
    mount(AppLayout, {
      global: {
        plugins: [router, createPinia()],
      },
    })
  beforeEach(() => {
    setActivePinia(createPinia())
    const mockComponent = { template: '<div>Mock Component</div>' }
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'Home', component: mockComponent },
        { path: '/signin', name: 'Auth.SignIn', component: mockComponent },
      ],
    })
  })
  it('Renders layout elements', () => {
    const wrapper = mountWithRouterAndPinia()
    expect(wrapper.html()).toContain('Simple Bluesky')
    expect(wrapper.html()).toContain('Sign Out')
  })
  it('Calls signOut and redirects on click', async () => {
    const wrapper = mountWithRouterAndPinia()
    const authStore = useAuthStore()
    const signOutSpy = vi.spyOn(authStore, 'signOut').mockResolvedValue()
    const routerPushSpy = vi.spyOn(router, 'push')
    await wrapper.get('[data-test="sign-out-btn"]').trigger('click')
    expect(signOutSpy).toHaveBeenCalled()
    expect(routerPushSpy).toHaveBeenCalledWith({ name: 'Auth.SignIn' })
  })
})
