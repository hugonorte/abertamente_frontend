import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchForm from './SearchForm/index.vue'
import { useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('SearchForm', () => {
  it('submits search and redirects to /search', async () => {
    const pushMock = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: pushMock } as any)

    const wrapper = mount(SearchForm)

    const input = wrapper.find('input[type="search"]')
    expect(input.exists()).toBe(true)
    
    await input.setValue('termo-de-busca')
    
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
    await form.trigger('submit.prevent')
    
    expect(pushMock).toHaveBeenCalledWith({
      path: '/search',
      query: { q: 'termo-de-busca' }
    })
  })
})
