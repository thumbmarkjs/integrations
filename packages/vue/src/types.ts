import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';
import { Ref } from 'vue';

export interface ThumbmarkPluginOptions {
  apiKey?: string;
  options?: ConstructorParameters<typeof Thumbmark>[0];
}

export interface UseThumbmarkResult {
  thumbmark: Ref<string | null>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  reload: () => Promise<void>;
}