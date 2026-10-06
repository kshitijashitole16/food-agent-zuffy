import Icon from '../common/Icon';
import BagLine from './BagLine';
import BagSummary from './BagSummary';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import type { CartLine } from '../../types/api';

interface BagDrawerProps {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  busy: boolean;
  error: string;
  onClose: () => void;
  onExplore: () => void;
  onCheckout: () => void;
  onChangeQuantity: (id: string, delta: number) => void;
}

export default function BagDrawer({
  lines,
  count,
  subtotal,
  deliveryFee,
  busy,
  error,
  onClose,
  onExplore,
  onCheckout,
  onChangeQuantity,
}: BagDrawerProps) {
  const dialogRef = useDialogFocus(onClose);
  return (
    <div
      className="bag-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="bag-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        ref={dialogRef}
      >
        <div className="bag-header">
          <div>
            <span className="eyebrow">GOOD THINGS INSIDE</span>
            <h2 id="bag-title">
              Your happy bag <span>({count})</span>
            </h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close bag">
            <Icon name="close" />
          </button>
        </div>
        {lines.length ? (
          <>
            <div className="bag-lines">
              {lines.map((item) => (
                <BagLine key={item.id} item={item} onChangeQuantity={onChangeQuantity} />
              ))}
            </div>
            <BagSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              busy={busy}
              error={error}
              onCheckout={onCheckout}
            />
          </>
        ) : (
          <div className="empty-bag">
            <span>
              <Icon name="bag" size={55} />
            </span>
            <h3>A little empty, a lot of potential.</h3>
            <p>Your next favorite dish belongs here.</p>
            <button className="primary-button" onClick={onExplore}>
              Find something delicious
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
