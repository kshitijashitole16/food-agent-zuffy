import { useEffect, useMemo, useState } from 'react';
import type { Cart, CartLine, MenuItem } from '../types/api';
import { readCart, save } from '../utils/storage';

export function useCart(menu: MenuItem[], notify: (message: string) => void) {
  const [cart, setCart] = useState<Cart>(readCart);
  useEffect(() => save('zuffy-cart', cart), [cart]);

  const lines = useMemo<CartLine[]>(
    () =>
      menu
        .filter((item) => cart[item.id] > 0)
        .map((item) => ({ ...item, quantity: cart[item.id] })),
    [cart, menu],
  );
  const count = lines.reduce((total, item) => total + item.quantity, 0);
  const subtotal = lines.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 399 || subtotal === 0 ? 0 : 29;

  function add(item: MenuItem) {
    if ((cart[item.id] ?? 0) >= 10) {
      notify('You can add up to 10 of each dish.');
      return;
    }
    setCart((current) => ({ ...current, [item.id]: Math.min(10, (current[item.id] ?? 0) + 1) }));
    notify(`${item.name} added to your bag`);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (current[id] ?? 0) + delta;
      if (quantity <= 0) delete next[id];
      else next[id] = Math.min(10, quantity);
      return next;
    });
  }

  return { lines, count, subtotal, deliveryFee, add, changeQuantity, clear: () => setCart({}) };
}
