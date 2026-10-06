import Icon from '../common/Icon';
import FoodCard from '../menu/FoodCard';
import type { ChatMessage as Message, MenuItem } from '../../types/api';
interface ChatMessageProps {
  message: Message;
  onAdd: (item: MenuItem) => void;
}
export default function ChatMessage({ message, onAdd }: ChatMessageProps) {
  const { toolsUsed = [], recommendations = [] } = message;
  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {message.role === 'assistant' ? <Icon name="sparkle" size={16} /> : 'You'}
      </div>
      <div className="message-main">
        <span className="message-label">{message.role === 'assistant' ? 'Zuffy' : 'You'}</span>
        <div className="message-content">{message.content}</div>
        {toolsUsed?.length > 0 && (
          <div className="tool-chips">
            {toolsUsed.map((tool) => (
              <span key={tool}>
                <Icon name="check" size={12} />
                {tool}
              </span>
            ))}
          </div>
        )}
        {recommendations?.length > 0 && (
          <div className="recommendations">
            {recommendations.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={onAdd} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
