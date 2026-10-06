import Icon from '../common/Icon';
import type { Health } from '../../types/api';
interface ConnectionStatusProps {
  health: Health | null;
  onRefresh: () => void;
}
export default function ConnectionStatus({ health, onRefresh }: ConnectionStatusProps) {
  const ready = health?.ollama === 'ready';
  return (
    <>
      <div className="top-line">
        <span>
          <i className="green-dot" /> A little hungry? You’re in the right place.
        </span>
        <button
          className={`connection-pill ${ready ? 'connected' : ''}`}
          onClick={onRefresh}
          title="Refresh assistant connection"
        >
          <i />
          {ready ? 'Assistant ready' : health ? 'Assistant offline' : 'Connecting…'}
          <Icon name="refresh" size={12} />
        </button>
      </div>
      {health && !ready && (
        <div className="notice" role="status">
          <Icon name="sparkle" size={19} />
          <span>
            {health.message || 'Start the Ollama app to chat. You can still explore the menu.'}
          </span>
          <button onClick={onRefresh}>Refresh</button>
        </div>
      )}
    </>
  );
}
