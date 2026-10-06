import type { RefObject } from 'react';
import Icon from '../common/Icon';
interface ChatComposerProps {
  input: string;
  busy: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onInputChange: (value: string) => void;
  onSend: () => void;
}
export default function ChatComposer({
  input,
  busy,
  textareaRef,
  onInputChange,
  onSend,
}: ChatComposerProps) {
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <div className="composer-box">
        <textarea
          ref={textareaRef}
          aria-label="Message Zuffy"
          placeholder="What are you craving? Ask me anything food…"
          value={input}
          maxLength={4000}
          rows={2}
          disabled={busy}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              onSend();
            }
          }}
        />
        <button
          className="send-button"
          type="submit"
          disabled={!input.trim() || busy}
          aria-label="Send message"
        >
          <Icon name="arrow" size={23} />
        </button>
      </div>
      <p>
        <span>Thoughtful suggestions, powered by your local AI.</span>
        <span>Enter to send ↵</span>
      </p>
    </form>
  );
}
