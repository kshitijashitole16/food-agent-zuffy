import Icon from '../common/Icon';
import FoodArt from '../common/FoodArt';
import DietSelect from '../common/DietSelect';
import type { Diet } from '../../types/api';
interface PreferencesPanelProps {
  diet: Diet;
  avoid: string;
  busy: boolean;
  onDietChange: (value: Diet) => void;
  onAvoidChange: (value: string) => void;
  onSend: (message: string) => void;
}
export default function PreferencesPanel({
  diet,
  avoid,
  busy,
  onDietChange,
  onAvoidChange,
  onSend,
}: PreferencesPanelProps) {
  return (
    <aside className="side-panel">
      <div className="preference-card">
        <div className="section-heading">
          <Icon name="leaf" size={19} />
          <h2>Your kind of food</h2>
        </div>
        <p>A little about you goes a long way.</p>
        <label htmlFor="diet">Diet preference</label>
        <DietSelect id="diet" value={diet} onChange={onDietChange} />
        <label htmlFor="avoid">Anything to avoid?</label>
        <input
          id="avoid"
          placeholder="e.g. peanuts, mushrooms"
          value={avoid}
          maxLength={300}
          onChange={(event) => onAvoidChange(event.target.value)}
        />
        <div className="preference-foot">
          <Icon name="check" size={13} /> Remembered for this browser
        </div>
      </div>
      <div className="inspiration-card">
        <span className="eyebrow">THE COMFORT CORNER</span>
        <span className="inspiration-emoji">
          <FoodArt dish="dal-khichdi" />
        </span>
        <h3>
          Some days call
          <br />
          for a bowl of comfort.
        </h3>
        <p>Let’s find your feel-good meal.</p>
        <button
          onClick={() =>
            onSend('Suggest a comforting meal from your menu that fits my preferences.')
          }
          disabled={busy}
        >
          Find my comfort food <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="little-note">
        <span>✦</span>
        <p>
          No big decisions.
          <br />
          Just your next delicious one.
        </p>
      </div>
    </aside>
  );
}
