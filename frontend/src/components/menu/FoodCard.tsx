import Icon from '../common/Icon';
import FoodArt from '../common/FoodArt';
import { money } from '../../utils/format';
import type { MenuItem } from '../../types/api';
interface FoodCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  compact?: boolean;
}
export default function FoodCard({ item, onAdd, compact = false }: FoodCardProps) {
  return (
    <article className={`food-card ${compact ? 'compact' : ''}`}>
      <div className={`food-art ${item.color}`}>
        <FoodArt dish={item.id} className="food-emoji" />
        <span className="food-tag">{item.tag}</span>
      </div>
      <div className="food-info">
        <div className="food-meta">
          <span
            className={`diet-mark ${item.diet === 'Non-Vegetarian' ? 'non-veg' : ''}`}
            aria-label={item.diet}
          />{' '}
          <span>{item.category}</span>
          <span className="rating">★ {item.rating}</span>
        </div>
        <h3>{item.name}</h3>
        {!compact && <p>{item.description}</p>}
        <div className="food-bottom">
          <strong>{money(item.price)}</strong>
          <span className="minutes">
            <Icon name="clock" size={13} />
            {item.minutes} min
          </span>
          <button
            className="add-button"
            aria-label={`Add ${item.name} to bag`}
            onClick={() => onAdd(item)}
          >
            <Icon name="plus" size={17} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
