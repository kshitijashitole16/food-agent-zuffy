import Icon from '../common/Icon';
import { suggestions } from '../../data/suggestions';
interface ChatWelcomeProps {
  busy: boolean;
  onSend: (message: string) => void;
}
export default function ChatWelcome({ busy, onSend }: ChatWelcomeProps) {
  return (
    <div className="chat-welcome">
      <div className="welcome-symbol">✦</div>
      <h3>Hey, hungry human.</h3>
      <p>What sounds good today?</p>
      <div className="suggestion-grid">
        {suggestions.map((suggestion) => (
          <button key={suggestion.title} onClick={() => onSend(suggestion.prompt)} disabled={busy}>
            <span className="suggestion-emoji">
              <Icon name={suggestion.icon} size={22} />
            </span>
            <span>
              <strong>{suggestion.title}</strong>
              <small>{suggestion.subtitle}</small>
            </span>
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </div>
    </div>
  );
}
