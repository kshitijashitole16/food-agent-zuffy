import { useState } from 'react';
import Icon from '../components/common/Icon';
import DietSelect from '../components/common/DietSelect';
import FoodCard from '../components/menu/FoodCard';
import type { Diet, MenuItem } from '../types/api';
const CATEGORIES = ['All', 'Indian', 'Bowls', 'Pizza', 'Wraps', 'Desserts'];
interface MenuPageProps {
  menu: MenuItem[];
  loading: boolean;
  error: string;
  diet: Diet;
  onDietChange: (diet: Diet) => void;
  onRetry: () => void;
  onAdd: (item: MenuItem) => void;
  onOpenChat: () => void;
}
export default function MenuPage({
  menu,
  loading,
  error,
  diet,
  onDietChange,
  onRetry,
  onAdd,
  onOpenChat,
}: MenuPageProps) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filteredMenu = menu.filter(
    (item) =>
      (category === 'All' || item.category === category) &&
      (diet === 'All' || item.diet === diet || (diet === 'Vegetarian' && item.diet === 'Vegan')) &&
      `${item.name} ${item.description} ${item.ingredients.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <section className="menu-section">
      <span className="eyebrow">FRESH PICKS, HAPPY PLATES</span>
      <div className="page-title">
        <div>
          <h1>
            Something delicious
            <br />
            <span>is waiting for you.</span>
          </h1>
          <p>A small menu, made for all your moods.</p>
        </div>
        <button className="outline-button" onClick={onOpenChat}>
          <Icon name="sparkle" size={18} /> Help me choose
        </button>
      </div>
      <div className="menu-controls">
        <div className="category-tabs">
          {CATEGORIES.map((value) => (
            <button
              key={value}
              className={category === value ? 'selected' : ''}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Icon name="search" size={17} />
          <input
            aria-label="Search menu"
            placeholder="Search a dish or ingredient"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      <div className="menu-diet">
        <label htmlFor="menu-diet">Showing</label>
        <DietSelect id="menu-diet" value={diet} onChange={onDietChange} />
        <span>{filteredMenu.length} delicious choices</span>
      </div>
      {loading ? (
        <p className="loading-text">Loading the menu…</p>
      ) : error ? (
        <div className="notice" role="alert">
          {error}
          <button onClick={onRetry}>Retry</button>
        </div>
      ) : filteredMenu.length ? (
        <div className="food-grid">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>
            <Icon name="leaf" size={55} />
          </span>
          <h3>No dishes found</h3>
          <p>Try a different search or dietary filter.</p>
          <button
            className="outline-button"
            onClick={() => {
              setSearch('');
              onDietChange('All');
              setCategory('All');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
