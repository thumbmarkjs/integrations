import { ref, inject, onMounted } from 'vue';
import { ThumbmarkSymbol, ThumbmarkInstance } from './plugin';
import { UseThumbmarkResult } from './types';

export function useThumbmark(): UseThumbmarkResult {
  const thumbmarkService = inject<ThumbmarkInstance>(ThumbmarkSymbol);
  
  const thumbmark = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  if (!thumbmarkService) {
    error.value = new Error('ThumbmarkJS plugin not installed. Make sure to install the plugin with app.use(createThumbmarkPlugin()).');
    return {
      thumbmark,
      isLoading,
      error,
      reload: async () => {},
    };
  }

  const generateThumbmark = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await thumbmarkService.thumbmarkInstance.get();
      thumbmark.value = result.thumbmark;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error occurred');
    } finally {
      isLoading.value = false;
    }
  };

  const reload = async () => {
    await generateThumbmark();
  };

  onMounted(() => {
    generateThumbmark();
  });

  return {
    thumbmark,
    isLoading,
    error,
    reload,
  };
}