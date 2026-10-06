import Icon from '../common/Icon';
import FoodCard from './FoodCard';
import type { MenuItem } from '../../types/api';
interface FavoritesProps {
  menu: MenuItem[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onExplore: () => void;
  onAdd: (item: MenuItem) => void;
}
export default function Favorites({
  menu,
  loading,
  error,
  onRetry,
  onExplore,
  onAdd,
}: FavoritesProps) {
  return (
    <section className="favorites">
      <div className="section-title">
        <div>
          <span className="eyebrow">A FEW CROWD FAVORITES</span>
          <h2>Small cravings. Big happiness.</h2>
        </div>
        <button className="text-button" onClick={onExplore}>
          Explore the menu <Icon name="arrow" size={17} />
        </button>
      </div>
      {loading ? (
        <p className="loading-text">Finding something delicious…</p>
      ) : error ? (
        <div className="notice" role="alert">
          {error}
          <button onClick={onRetry}>Retry</button>
        </div>
      ) : (
        <div className="food-grid favorites-grid">
          {menu.slice(0, 3).map((item) => (
            <FoodCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}
