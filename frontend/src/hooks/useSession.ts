import { useEffect, useState } from 'react';
import { readSaved, save } from '../utils/storage';

export function useSession(): string {
  const [sessionId] = useState(() => {
    const saved = readSaved('zuffy-session');
    return typeof saved === 'string' && /^[a-zA-Z0-9_-]{8,64}$/.test(saved)
      ? saved
      : crypto.randomUUID();
  });
  useEffect(() => save('zuffy-session', sessionId), [sessionId]);
  return sessionId;
}
