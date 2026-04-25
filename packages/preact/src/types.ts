import { ComponentChildren } from 'preact';
import { Thumbmark, ThumbmarkResponse } from '@thumbmarkjs/thumbmarkjs';

export interface ThumbmarkProviderProps {
  children: ComponentChildren;
  apiKey?: string;
  options?: ConstructorParameters<typeof Thumbmark>[0];
}

export interface UseThumbmarkResult {
  thumbmark: string | null;
  visitorId: string | null;
  isLoading: boolean;
  error: Error | null;
  components: ThumbmarkResponse['components'] | null;
  info: ThumbmarkResponse['info'] | null;
  /**
   * The full response returned by `Thumbmark.get()`. Useful when the
   * consumer needs access to fields like `version`, `requestId`,
   * `metadata`, or `error[]` that aren't exposed as top-level
   * properties of the hook result.
   */
  data: ThumbmarkResponse | null;
  reload: () => Promise<void>;
}
