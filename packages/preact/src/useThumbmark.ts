import { useState, useEffect, useContext, useCallback } from 'preact/hooks';
import { ThumbmarkContext } from './ThumbmarkContext';
import { UseThumbmarkResult } from './types';

export const useThumbmark = (): UseThumbmarkResult => {
  const { thumbmarkInstance } = useContext(ThumbmarkContext);
  const [thumbmark, setThumbmark] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [components, setComponents] = useState<UseThumbmarkResult['components']>(null);
  const [info, setInfo] = useState<UseThumbmarkResult['info']>(null);
  const [data, setData] = useState<UseThumbmarkResult['data']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const generateThumbmark = useCallback(async () => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return;
    }

    if (!thumbmarkInstance) {
      setError(new Error('ThumbmarkProvider not found. Make sure to wrap your component with ThumbmarkProvider.'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await thumbmarkInstance.get();
      setData(result);
      setThumbmark(result.thumbmark);
      setVisitorId(result.visitorId || null);
      setComponents(result.components || null);
      setInfo(result.info || null);
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
    visitorId,
    isLoading,
    error,
    components,
    info,
    data,
    reload,
  };
};
