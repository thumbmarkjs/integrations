export { ThumbmarkProvider, getThumbmarkVersion } from './ThumbmarkProvider';
export { useThumbmark } from './useThumbmark';
export type { ThumbmarkProviderProps, UseThumbmarkResult } from './types';

// Export version from package.json
import { version } from '../package.json';
export { version };