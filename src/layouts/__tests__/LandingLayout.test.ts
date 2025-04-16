import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '../LandingLayout.vue'

vi.mock('naive-ui', () => {
  const createStub = (name: string) => ({
    name,
    template: `<div><slot></slot></div>`,
  })

  return {
    NLayout: createStub('NLayout'),
    NLayoutContent: createStub('NLayoutContent'),
    NSpace: createStub('NSpace'),
    NCard: createStub('NCard'),
  }
})

describe('LandingLayout', () => {
  const mockComponent = {
    template: '<div data-test="router-view-content">Login Page</div>',
  }
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: mockComponent }],
  })
  it('Renders layout with router-view content', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(LandingLayout, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('[data-test="router-view-content"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="router-view-content"]').text()).toBe('Login Page')
    expect(wrapper.find('[data-test="card"]').exists()).toBe(true)
  })
})
