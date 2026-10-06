import { useEffect, useRef } from 'react';
import Icon from '../common/Icon';
import ChatWelcome from './ChatWelcome';
import ChatMessage from './ChatMessage';
import ChatComposer from './ChatComposer';
import type { ChatMessage as Message, MenuItem } from '../../types/api';

interface ChatPanelProps {
  messages: Message[];
  input: string;
  busy: boolean;
  error: string;
  onInputChange: (value: string) => void;
  onSend: (message?: string) => void;
  onClear: () => void;
  onAdd: (item: MenuItem) => void;
}

export default function ChatPanel({
  messages,
  input,
  busy,
  error,
  onInputChange,
  onSend,
  onClear,
  onAdd,
}: ChatPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wasBusy = useRef(false);
  useEffect(() => {
    if (messages.length || busy)
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, busy]);
  useEffect(() => {
    if (wasBusy.current && !busy) textareaRef.current?.focus();
    wasBusy.current = busy;
  }, [busy]);

  return (
    <section className="chat-panel" aria-label="Chat with Zuffy">
      <div className="chat-header">
        <div className="assistant-avatar">
          <Icon name="sparkle" size={20} />
        </div>
        <div>
          <h2>
            Ask Zuffy <span>your delicious sidekick</span>
          </h2>
          <p>Recipes, recommendations & a little peace of mind.</p>
        </div>
        <button
          className="new-chat-button"
          onClick={onClear}
          disabled={busy}
          title="Clear this conversation"
          aria-label="New chat"
        >
          <Icon name="plus" size={17} />
          <span>New chat</span>
        </button>
      </div>
      <div
        className={`chat-body ${messages.length ? 'has-messages' : ''}`}
        aria-live="polite"
        aria-busy={busy}
      >
        {!messages.length ? (
          <ChatWelcome busy={busy} onSend={onSend} />
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} onAdd={onAdd} />
          ))
        )}
        {busy && (
          <div className="thinking">
            <span>✦</span>
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <small>Zuffy is thinking…</small>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {error && (
        <div className="chat-error" role="alert">
          {error}{' '}
          <button onClick={() => onSend(input)} disabled={busy}>
            Try again
          </button>
        </div>
      )}
      <ChatComposer
        input={input}
        busy={busy}
        textareaRef={textareaRef}
        onInputChange={onInputChange}
        onSend={() => onSend()}
      />
    </section>
  );
}
