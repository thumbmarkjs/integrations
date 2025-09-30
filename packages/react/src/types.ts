import { ReactNode } from 'react';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';

export interface ThumbmarkProviderProps {
  children: ReactNode;
  apiKey?: string;
  options?: ConstructorParameters<typeof Thumbmark>[0];
}

export interface UseThumbmarkResult {
  thumbmark: string | null;
  visitorId: string | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}