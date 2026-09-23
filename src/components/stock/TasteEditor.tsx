import { TASTE_LABELS } from '../../data/labels';
import { TASTE_DIMENSIONS, type TasteDimension, type TasteProfile } from '../../types/ingredient';

interface TasteEditorProps {
  taste: TasteProfile;
  onChange: (dimension: TasteDimension, value: number) => void;
}

export function TasteEditor({ taste, onChange }: TasteEditorProps) {
  return (
    <fieldset className="editor-section">
      <legend>Okus (0–10)</legend>
      {TASTE_DIMENSIONS.map((dimension) => (
        <label key={dimension} className="slider-row">
          <span>{TASTE_LABELS[dimension]}</span>
          <input
            type="range"
            min={0}
            max={10}
            value={taste[dimension]}
            onChange={(event) => onChange(dimension, Number(event.target.value))}
          />
          <output>{taste[dimension]}</output>
        </label>
      ))}
    </fieldset>
  );
}
