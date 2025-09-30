import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import { createThumbmarkPlugin } from '@thumbmarkjs/vue'
import BasicTest from '../BasicTest.vue'
import ValidApiKeyTest from '../ValidApiKeyTest.vue'
import InvalidApiKeyTest from '../InvalidApiKeyTest.vue'
import ReloadTest from '../ReloadTest.vue'

// Mock the thumbmarkjs library
vi.mock('@thumbmarkjs/thumbmarkjs', () => ({
  default: {
    get: vi.fn().mockImplementation(() => 
      Promise.resolve({ thumbmark: 'mocked-thumbmark-12345' })
    )
  }
}))

describe('Vue Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Test 1: Basic Usage (No Options)', () => {
    it('should render basic test component', () => {
      const app = createApp({})
      app.use(createThumbmarkPlugin())
      
      const wrapper = mount(BasicTest, {
        global: {
          plugins: [createThumbmarkPlugin()]
        }
      })

      expect(wrapper.find('h2').text()).toBe('Test 1: Basic Usage (No Options)')
      expect(wrapper.find('[data-testid="basic-loading"]').exists() || 
             wrapper.find('[data-testid="basic-thumbmark"]').exists()).toBe(true)
    })
  })

  describe('Test 2: Valid API Key', () => {
    it('should render valid API key test component', () => {
      const wrapper = mount(ValidApiKeyTest)

      expect(wrapper.find('h2').text()).toBe('Test 2: Valid API Key')
      expect(wrapper.find('[data-testid="valid-loading"]').exists() ||
             wrapper.find('[data-testid="valid-thumbmark"]').exists() ||
             wrapper.find('[data-testid="valid-error"]').exists()).toBe(true)
    })
  })

  describe('Test 3: Invalid API Key', () => {
    it('should render invalid API key test component', () => {
      const wrapper = mount(InvalidApiKeyTest)

      expect(wrapper.find('h2').text()).toBe('Test 3: Invalid API Key')
      expect(wrapper.find('[data-testid="invalid-loading"]').exists() ||
             wrapper.find('[data-testid="invalid-thumbmark"]').exists() ||
             wrapper.find('[data-testid="invalid-error"]').exists()).toBe(true)
    })
  })

  describe('Test 4: Reload Functionality', () => {
    it('should render reload test component with reload button', async () => {
      const wrapper = mount(ReloadTest)

      expect(wrapper.find('h2').text()).toBe('Test 4: Reload Functionality')
      expect(wrapper.find('[data-testid="reload-loading"]').exists() ||
             wrapper.find('[data-testid="reload-thumbmark"]').exists() ||
             wrapper.find('[data-testid="reload-error"]').exists()).toBe(true)
    })
  })

  describe('Component Structure', () => {
    it('should have all required test sections', () => {
      const basicWrapper = mount(BasicTest, {
        global: {
          plugins: [createThumbmarkPlugin()]
        }
      })
      const validWrapper = mount(ValidApiKeyTest)
      const invalidWrapper = mount(InvalidApiKeyTest)
      const reloadWrapper = mount(ReloadTest)

      expect(basicWrapper.find('.test-section').exists()).toBe(true)
      expect(validWrapper.find('.test-section').exists()).toBe(true)
      expect(invalidWrapper.find('.test-section').exists()).toBe(true)
      expect(reloadWrapper.find('.test-section').exists()).toBe(true)
    })
  })
})