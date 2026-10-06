import { useEffect, useState } from 'react';
import type { Diet } from '../types/api';
import { isDiet, readSaved, save } from '../utils/storage';

export function usePreferences() {
  const [diet, setDiet] = useState<Diet>(() => {
    const value = readSaved('zuffy-diet');
    return isDiet(value) ? value : 'All';
  });
  const [avoid, setAvoid] = useState(() => {
    const value = readSaved('zuffy-avoid');
    return typeof value === 'string' ? value.slice(0, 300) : '';
  });
  useEffect(() => {
    save('zuffy-diet', diet);
    save('zuffy-avoid', avoid);
  }, [diet, avoid]);
  return { diet, avoid, setDiet, setAvoid };
}
