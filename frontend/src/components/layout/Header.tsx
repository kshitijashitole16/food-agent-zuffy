import Icon from '../common/Icon';
import type { Tab } from '../../types/api';
const NAVIGATION: ReadonlyArray<readonly [Tab, string]> = [
  ['assistant', 'Ask Zuffy'],
  ['menu', 'Explore menu'],
  ['orders', 'My orders'],
];
interface HeaderProps {
  tab: Tab;
  count: number;
  onNavigate: (tab: Tab) => void;
  onOpenBag: () => void;
}
export default function Header({ tab, count, onNavigate, onOpenBag }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <button className="brand" onClick={() => onNavigate('assistant')} aria-label="Zuffy home">
          <span className="brand-icon">
            z<span>••</span>
          </span>
          <span>
            zuffy<span className="brand-dot">.</span>
          </span>
        </button>
        <nav aria-label="Main navigation">
          {NAVIGATION.map(([value, label]) => (
            <button
              key={value}
              className={tab === value ? 'active' : ''}
              onClick={() => onNavigate(value)}
            >
              {label}
              {value === 'assistant' && <span className="nav-ai">AI</span>}
            </button>
          ))}
        </nav>
        <button className="bag-button" onClick={onOpenBag}>
          <Icon name="bag" size={19} />
          <span>My bag</span>
          <b>{count}</b>
        </button>
      </div>
    </header>
  );
}
