import type { Diet } from '../../types/api';
import { DIETS, isDiet } from '../../utils/storage';

interface DietSelectProps {
  id: string;
  value: Diet;
  onChange: (diet: Diet) => void;
}

export default function DietSelect({ id, value, onChange }: DietSelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => {
        if (isDiet(event.target.value)) onChange(event.target.value);
      }}
    >
      {DIETS.map((diet) => (
        <option key={diet}>{diet}</option>
      ))}
    </select>
  );
}
