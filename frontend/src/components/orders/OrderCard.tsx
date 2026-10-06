import Icon from '../common/Icon';
import FoodArt from '../common/FoodArt';
import { money } from '../../utils/format';
import type { Order, OrderStatus } from '../../types/api';
interface OrderCardProps {
  order: Order;
  onAsk: (message: string) => void;
}
export default function OrderCard({ order, onAsk }: OrderCardProps) {
  const stages: readonly OrderStatus[] = ['Preparing', 'On the way', 'Delivered'];
  const current = stages.indexOf(order.status);
  return (
    <article className="order-card">
      <div className="order-card-top">
        <div>
          <span className="eyebrow">DEMO ORDER</span>
          <h3>{order.id}</h3>
        </div>
        <span className="order-badge">{order.status}</span>
      </div>
      <div className="order-items">
        {order.items.map((item) => (
          <div key={item.itemId}>
            <span>
              <FoodArt dish={item.itemId} /> {item.quantity} × {item.name}
            </span>
            <strong>{money(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="order-steps">
        {stages.map((stage, index) => (
          <div className={index <= current ? 'done' : ''} key={stage}>
            <span>{index <= current ? <Icon name="check" size={12} /> : index + 1}</span>
            <small>{stage}</small>
          </div>
        ))}
      </div>
      <div className="order-card-bottom">
        <strong>Total {money(order.total)}</strong>
        <button className="text-button" onClick={() => onAsk(`Please check order ${order.id}.`)}>
          Ask Zuffy <Icon name="arrow" size={15} />
        </button>
      </div>
      <p className="demo-note">Simulated delivery in 2 minutes. No payment or real delivery.</p>
    </article>
  );
}
