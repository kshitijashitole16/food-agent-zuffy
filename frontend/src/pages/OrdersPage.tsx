import Icon from '../components/common/Icon';
import OrderCard from '../components/orders/OrderCard';
import type { Order } from '../types/api';
interface OrdersPageProps {
  orders: Order[];
  error: string;
  onRefresh: () => void;
  onAsk: (message: string) => void;
  onExplore: () => void;
}
export default function OrdersPage({
  orders,
  error,
  onRefresh,
  onAsk,
  onExplore,
}: OrdersPageProps) {
  return (
    <section className="orders-section">
      <span className="eyebrow">FROM OUR KITCHEN TO YOUR SCREEN</span>
      <div className="page-title">
        <div>
          <h1>
            Your happy
            <br />
            <span>little orders.</span>
          </h1>
          <p>Demo orders, with a little real-time magic.</p>
        </div>
        <button className="outline-button" onClick={onRefresh}>
          <Icon name="refresh" size={17} /> Refresh orders
        </button>
      </div>
      {error && (
        <div className="notice" role="alert">
          {error}
        </div>
      )}
      {orders.length ? (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onAsk={onAsk} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="empty-state">
            <span>
              <Icon name="bag" size={55} />
            </span>
            <h3>Your first craving is waiting.</h3>
            <p>Add a dish to your bag and place a demo order.</p>
            <button className="primary-button" onClick={onExplore}>
              Explore menu <Icon name="arrow" size={17} />
            </button>
          </div>
        )
      )}
    </section>
  );
}
