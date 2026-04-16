import { useMemo } from 'preact/hooks';
import { Thumbmark, getVersion } from '@thumbmarkjs/thumbmarkjs';
import { ThumbmarkContext } from './ThumbmarkContext';
import { ThumbmarkProviderProps } from './types';

export function ThumbmarkProvider({
  children,
  apiKey,
  options = {},
}: ThumbmarkProviderProps) {
  const optionsKey = JSON.stringify(options);

  const thumbmarkInstance = useMemo(() => {
    // Only create Thumbmark instance on client-side
    if (typeof window === 'undefined') {
      return null;
    }

    const config = apiKey ? { ...options, api_key: apiKey } : options;
    return new Thumbmark(config);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, optionsKey]);

  const contextValue = useMemo(
    () => ({
      thumbmarkInstance,
    }),
    [thumbmarkInstance]
  );

  return (
    <ThumbmarkContext.Provider value={contextValue}>
      {children}
    </ThumbmarkContext.Provider>
  );
}

export { getVersion as getThumbmarkVersion };
