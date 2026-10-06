import { useCallback, useEffect, useRef, useState } from 'react';
import { zuffyApi } from '../api/zuffyApi';
import type { Order, OrderLineRequest } from '../types/api';
import { errorMessage } from '../utils/format';

export function useOrders(sessionId: string, active: boolean) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const checkoutLock = useRef(false);

  const refresh = useCallback(async () => {
    try {
      setOrders(await zuffyApi.getOrders(sessionId));
      setError('');
    } catch (error: unknown) {
      setError(errorMessage(error));
    }
  }, [sessionId]);
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const hasActiveOrder = orders.some((order) => order.status !== 'Delivered');
  useEffect(() => {
    if (!active || !hasActiveOrder) return;
    const timer = window.setInterval(() => {
      void refresh();
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [active, hasActiveOrder, refresh]);

  const placeOrder = useCallback(
    async (items: OrderLineRequest[]): Promise<Order | null> => {
      if (!items.length || checkoutLock.current) return null;
      checkoutLock.current = true;
      setCheckoutBusy(true);
      setCheckoutError('');
      try {
        const order = await zuffyApi.createOrder({ sessionId, items });
        setOrders((current) => [order, ...current]);
        return order;
      } catch (error: unknown) {
        setCheckoutError(errorMessage(error));
        return null;
      } finally {
        checkoutLock.current = false;
        setCheckoutBusy(false);
      }
    },
    [sessionId],
  );

  return { orders, error, refresh, placeOrder, checkoutBusy, checkoutError };
}
