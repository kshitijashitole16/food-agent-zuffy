import { useEffect, useRef, useState } from 'react';
import { zuffyApi } from '../api/zuffyApi';
import type { ChatMessage, Preferences } from '../types/api';
import { errorMessage } from '../utils/format';
import { readChat, save } from '../utils/storage';

export function useChat(
  sessionId: string,
  preferences: Preferences,
  onReady: (model: string) => void,
) {
  const [messages, setMessages] = useState<ChatMessage[]>(readChat);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const sendLock = useRef(false);
  useEffect(() => save('zuffy-chat', messages.slice(-24)), [messages]);

  async function send(text = input): Promise<void> {
    const value = text.trim();
    if (!value || sendLock.current) return;
    sendLock.current = true;
    setBusy(true);
    setError('');
    setInput('');
    const history = messages
      .filter((message) => !message.localOnly)
      .slice(-12)
      .map(({ role, content }) => ({ role, content }));
    const previous = messages.at(-1);
    const retrying = previous?.role === 'user' && previous.localOnly && previous.content === value;
    const userId = retrying ? previous.id : crypto.randomUUID();
    if (!retrying)
      setMessages((current) => [
        ...current,
        { id: userId, role: 'user', content: value, localOnly: true },
      ]);

    try {
      const response = await zuffyApi.chat({ message: value, sessionId, history, preferences });
      setMessages((current) => [
        ...current.map((message) =>
          message.id === userId ? { ...message, localOnly: false } : message,
        ),
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.reply,
          toolsUsed: response.toolsUsed,
          recommendations: response.recommendations,
        },
      ]);
      onReady(response.model);
    } catch (error: unknown) {
      setError(errorMessage(error));
      setInput(value);
    } finally {
      sendLock.current = false;
      setBusy(false);
    }
  }

  function clear() {
    if (sendLock.current) return;
    setMessages([]);
    setError('');
    setInput('');
  }

  return { messages, input, setInput, busy, error, send, clear };
}
