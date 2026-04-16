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
  reload: () => Promise<void>;
}
