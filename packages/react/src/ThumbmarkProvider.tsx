import React, { useMemo } from 'react';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';
import { ThumbmarkContext } from './ThumbmarkContext';
import { ThumbmarkProviderProps } from './types';

export const ThumbmarkProvider: React.FC<ThumbmarkProviderProps> = ({
  children,
  apiKey,
  options = {},
}) => {
  const thumbmarkInstance = useMemo(() => {
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