import { useState, useEffect, useContext, useCallback } from 'react';
import { ThumbmarkContext } from './ThumbmarkContext';
import { UseThumbmarkResult } from './types';

export const useThumbmark = (): UseThumbmarkResult => {
  const { thumbmarkInstance } = useContext(ThumbmarkContext);
  const [thumbmark, setThumbmark] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateThumbmark = useCallback(async () => {
    if (!thumbmarkInstance) {
      setError(new Error('ThumbmarkProvider not found. Make sure to wrap your component with ThumbmarkProvider.'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await thumbmarkInstance.get();
      setThumbmark(result.thumbmark);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [thumbmarkInstance]);

  const reload = useCallback(async () => {
    await generateThumbmark();
  }, [generateThumbmark]);

  useEffect(() => {
    generateThumbmark();
  }, [generateThumbmark]);

  return {
    thumbmark,
    isLoading,
    error,
    reload,
  };
};