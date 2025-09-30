import { App, inject, onMounted, ref, type InjectionKey, type Ref } from 'vue'
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs'

// Types
interface ThumbmarkPluginOptions {
  apiKey?: string
  options?: ConstructorParameters<typeof Thumbmark>[0]
}

interface UseThumbmarkResult {
  thumbmark: Ref<string | null>
  visitorId: Ref<string | null>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  reload: () => Promise<void>
}

// Injection key for type safety
const THUMBMARK_INSTANCE: InjectionKey<Thumbmark | null> = Symbol('thumbmark-instance')

/**
 * Creates a Vue plugin for ThumbmarkJS integration.
 *
 * @example
 * ```js
 * import { createApp } from 'vue'
 * import { createThumbmarkPlugin } from '@thumbmarkjs/vue'
 *
 * const app = createApp(App)
 * app.use(createThumbmarkPlugin({ apiKey: 'your-api-key' }))
 * ```
 */
export function createThumbmarkPlugin(options: ThumbmarkPluginOptions = {}) {
  return {
    install(app: App) {
      let thumbmarkInstance: Thumbmark | null = null

      // Only create instance on client-side for SSR compatibility
      if (typeof window !== 'undefined') {
        const config = options.apiKey
          ? { ...options.options, api_key: options.apiKey }
          : options.options || {}
        thumbmarkInstance = new Thumbmark(config)
      }

      // Provide instance for injection
      app.provide(THUMBMARK_INSTANCE, thumbmarkInstance)

      // Also expose on global properties
      app.config.globalProperties.$thumbmark = thumbmarkInstance
    },
  }
}

/**
 * Composable for getting thumbmark with reactive state.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useThumbmark } from '@thumbmarkjs/vue'
 *
 * const { thumbmark, visitorId, isLoading, error, reload } = useThumbmark()
 * </script>
 *
 * <template>
 *   <div v-if="isLoading">Loading...</div>
 *   <div v-else-if="error">Error: {{ error.message }}</div>
 *   <div v-else>
 *     <div>Visitor ID: {{ visitorId }}</div>
 *     <div>Thumbmark: {{ thumbmark }}</div>
 *   </div>
 * </template>
 * ```
 */
export function useThumbmark(): UseThumbmarkResult {
  const thumbmarkInstance = inject(THUMBMARK_INSTANCE)
  const thumbmark = ref<string | null>(null)
  const visitorId = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  if (!thumbmarkInstance) {
    error.value = new Error('ThumbmarkJS plugin not installed. Use app.use(createThumbmarkPlugin()).')
    return { thumbmark, visitorId, isLoading, error, reload: async () => {} }
  }

  const getThumbmark = async () => {
    if (typeof window === 'undefined') return

    isLoading.value = true
    error.value = null

    try {
      const result = await thumbmarkInstance.get()
      thumbmark.value = result.thumbmark
      visitorId.value = result.visitorId || null
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error occurred')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => getThumbmark())

  return {
    thumbmark,
    visitorId,
    isLoading,
    error,
    reload: getThumbmark,
  }
}

// Re-exports
export { getVersion as getThumbmarkVersion } from '@thumbmarkjs/thumbmarkjs'
export { version } from '../package.json'