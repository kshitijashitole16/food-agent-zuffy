import Icon from '../common/Icon';
import { money } from '../../utils/format';

interface BagSummaryProps {
  subtotal: number;
  deliveryFee: number;
  busy: boolean;
  error: string;
  onCheckout: () => void;
}

export default function BagSummary({
  subtotal,
  deliveryFee,
  busy,
  error,
  onCheckout,
}: BagSummaryProps) {
  return (
    <div className="bag-summary">
      <div>
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div>
        <span>Demo delivery fee</span>
        <span>{deliveryFee ? money(deliveryFee) : 'Free'}</span>
      </div>
      {subtotal < 399 && (
        <p className="free-delivery-tip">
          Add {money(399 - subtotal)} more for free demo delivery.
        </p>
      )}
      <div className="bag-total">
        <strong>Total</strong>
        <strong>{money(subtotal + deliveryFee)}</strong>
      </div>
      {error && (
        <p className="checkout-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary-button checkout-button" onClick={onCheckout} disabled={busy}>
        {busy ? 'Creating your order…' : 'Place demo order'}
        <Icon name="arrow" size={18} />
      </button>
      <p className="demo-note">
        This is a demo. No payment, restaurant dispatch, or real delivery.
      </p>
    </div>
  );
}
