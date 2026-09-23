import { AROMA_FAMILY_STYLES, CHEMICAL_CLASS_LABELS } from '../../data/labels';
import type { CompoundUsage } from '../../hooks/useCompoundUsage';
import type { AromaCompound } from '../../types/aroma';
import { FormulaText } from '../shared/FormulaText';

interface CompoundCardProps {
  compound: AromaCompound;
  usages: CompoundUsage[];
}

export function CompoundCard({ compound, usages }: CompoundCardProps) {
  return (
    <article className="compound-card">
      <header>
        <strong>{compound.name}</strong>
        <FormulaText formula={compound.formula} />
      </header>
      <p className="compound-card__class">{CHEMICAL_CLASS_LABELS[compound.chemicalClass]}</p>
      <div className="chip-row">
        {compound.families.map((family) => (
          <span
            key={family}
            className="family-tag"
            style={{ background: `${AROMA_FAMILY_STYLES[family].color}40` }}
          >
            {AROMA_FAMILY_STYLES[family].label}
          </span>
        ))}
      </div>
      <p className="compound-card__descriptors">{compound.descriptors}</p>
      {usages.length > 0 && (
        <p className="compound-card__usage">
          <span>Nalazi se u: </span>
          {usages.map((usage) => `${usage.ingredient.name} (${usage.intensity})`).join(', ')}
        </p>
      )}
    </article>
  );
}
