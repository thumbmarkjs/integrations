import React, { useMemo } from 'react';
import { Thumbmark, getVersion } from '@thumbmarkjs/thumbmarkjs';
import { ThumbmarkContext } from './ThumbmarkContext';
import { ThumbmarkProviderProps } from './types';

export const ThumbmarkProvider: React.FC<ThumbmarkProviderProps> = ({
  children,
  apiKey,
  options = {},
}) => {
  const thumbmarkInstance = useMemo(() => {
    // Only create Thumbmark instance on client-side
    if (typeof window === 'undefined') {
      return null;
    }
    
    const config = apiKey ? { ...options, api_key: apiKey } : options;
    return new Thumbmark(config);
  }, [apiKey, options]);

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
};

export { getVersion as getThumbmarkVersion };