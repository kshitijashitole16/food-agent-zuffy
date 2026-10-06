import Icon from './Icon';

export default function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      <Icon name="check" size={16} />
      {message}
    </div>
  );
}
