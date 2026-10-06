import { useCallback, useEffect, useState } from 'react';
import { zuffyApi } from '../api/zuffyApi';
import type { MenuItem } from '../types/api';
import { errorMessage } from '../utils/format';

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setMenu(await zuffyApi.getMenu());
      setError('');
    } catch (error: unknown) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { menu, loading, error, refresh };
}
