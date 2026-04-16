import { createContext } from 'preact';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';

export interface ThumbmarkContextValue {
  thumbmarkInstance: Thumbmark | null;
}

export const ThumbmarkContext = createContext<ThumbmarkContextValue>({
  thumbmarkInstance: null,
});
