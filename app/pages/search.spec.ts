import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import SearchPage from './search.vue'
import { useRoute } from 'vue-router'
import { useFetch } from '#app'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn() }))
}))

vi.mock('#app', () => ({
  useFetch: vi.fn(),
  useRuntimeConfig: vi.fn(() => ({
    public: { apiBaseUrl: 'http://localhost:8000/api' }
  }))
}))

describe('search.vue', () => {
  it('renders search results correctly', async () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { q: 'teste' }
    } as any)

    vi.mocked(useFetch).mockReturnValue({
      data: ref([
        { id: 1, title: 'Post de Teste 1', tldr: 'Resumo do post 1' },
        { id: 2, title: 'Post de Teste 2', tldr: 'Resumo do post 2' }
      ]),
      pending: ref(false),
      error: ref(null),
      refresh: vi.fn()
    } as any)

    const wrapper = mount(SearchPage, {
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' },
          ClientOnly: true
        }
      }
    })

    // wait for async components/setup
    await wrapper.vm.$nextTick()

    // Assert items rendered
    expect(wrapper.text()).toContain('Post de Teste 1')
    expect(wrapper.text()).toContain('Resumo do post 1')
    expect(wrapper.text()).toContain('Post de Teste 2')
    expect(wrapper.text()).toContain('Resumo do post 2')
  })

  it('displays empty state if no results', async () => {
    vi.mocked(useRoute).mockReturnValue({
      query: { q: 'nao-existe' }
    } as any)

    vi.mocked(useFetch).mockReturnValue({
      data: ref([]),
      pending: ref(false),
      error: ref(null),
      refresh: vi.fn()
    } as any)

    const wrapper = mount(SearchPage, {
      global: {
        stubs: { NuxtLink: { template: '<a><slot /></a>' }, ClientOnly: true }
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Nenhum post encontrado')
  })
})
