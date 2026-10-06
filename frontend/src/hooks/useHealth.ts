import { useCallback, useEffect, useState } from 'react';
import { zuffyApi } from '../api/zuffyApi';
import type { Health } from '../types/api';
import { errorMessage } from '../utils/format';

export function useHealth() {
  const [health, setHealth] = useState<Health | null>(null);
  const refresh = useCallback(async () => {
    try {
      setHealth(await zuffyApi.getHealth());
    } catch (error: unknown) {
      setHealth((current) => ({
        status: 'UNKNOWN',
        ollama: 'offline',
        model: current?.model ?? 'llama3.2:3b',
        message: errorMessage(error),
      }));
    }
  }, []);
  const markReady = useCallback((model: string) => {
    setHealth({
      status: 'UP',
      ollama: 'ready',
      model,
      message: 'Your local food assistant is ready.',
    });
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { health, refresh, markReady };
}
