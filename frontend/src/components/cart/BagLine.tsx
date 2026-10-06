import Icon from '../common/Icon';
import FoodArt from '../common/FoodArt';
import { money } from '../../utils/format';
import type { CartLine } from '../../types/api';
interface BagLineProps {
  item: CartLine;
  onChangeQuantity: (id: string, delta: number) => void;
}
export default function BagLine({ item, onChangeQuantity }: BagLineProps) {
  return (
    <div className="bag-line">
      <span className={`bag-food ${item.color}`}>
        <FoodArt dish={item.id} />
      </span>
      <div>
        <h3>{item.name}</h3>
        <strong>{money(item.price)}</strong>
        <div className="quantity-control">
          <button
            onClick={() => onChangeQuantity(item.id, -1)}
            aria-label={`Remove one ${item.name}`}
          >
            <Icon name="minus" size={13} />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onChangeQuantity(item.id, 1)}
            disabled={item.quantity >= 10}
            aria-label={`Add one ${item.name}`}
          >
            <Icon name="plus" size={13} />
          </button>
        </div>
      </div>
      <strong>{money(item.price * item.quantity)}</strong>
    </div>
  );
}
