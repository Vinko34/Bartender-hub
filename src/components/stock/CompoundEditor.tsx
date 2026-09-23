import { aromaCompounds, aromaCompoundsById } from '../../data/aromaCompounds';
import type { CompoundPresence } from '../../types/ingredient';
import { CompoundChip } from '../shared/CompoundChip';

const DEFAULT_NEW_INTENSITY = 3;

interface CompoundEditorProps {
  compounds: CompoundPresence[];
  onChange: (compounds: CompoundPresence[]) => void;
}

export function CompoundEditor({ compounds, onChange }: CompoundEditorProps) {
  const usedCompoundIds = new Set(compounds.map((presence) => presence.compoundId));
  const availableCompounds = aromaCompounds
    .filter((compound) => !usedCompoundIds.has(compound.id))
    .sort((firstCompound, secondCompound) => firstCompound.name.localeCompare(secondCompound.name, 'hr'));

  const setIntensity = (compoundId: string, intensity: number) =>
    onChange(compounds.map((presence) => (presence.compoundId === compoundId ? { ...presence, intensity } : presence)));

  const removeCompound = (compoundId: string) =>
    onChange(compounds.filter((presence) => presence.compoundId !== compoundId));

  const addCompound = (compoundId: string) => {
    if (compoundId) {
      onChange([...compounds, { compoundId, intensity: DEFAULT_NEW_INTENSITY }]);
    }
  };

  return (
    <fieldset className="editor-section">
      <legend>Kemijski sastav – aromatski spojevi (intenzitet 1–5)</legend>
      {compounds.map((presence) => {
        const compound = aromaCompoundsById.get(presence.compoundId);
        if (!compound) return null;
        return (
          <div key={presence.compoundId} className="slider-row">
            <CompoundChip compound={compound} />
            <input
              type="range"
              min={1}
              max={5}
              value={presence.intensity}
              onChange={(event) => setIntensity(presence.compoundId, Number(event.target.value))}
            />
            <output>{presence.intensity}</output>
            <button
              type="button"
              className="icon-button"
              aria-label={`Ukloni ${compound.name}`}
              onClick={() => removeCompound(presence.compoundId)}
            >
              ×
            </button>
          </div>
        );
      })}
      <select value="" onChange={(event) => addCompound(event.target.value)}>
        <option value="">+ Dodaj spoj…</option>
        {availableCompounds.map((compound) => (
          <option key={compound.id} value={compound.id}>
            {compound.name} — {compound.descriptors}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
