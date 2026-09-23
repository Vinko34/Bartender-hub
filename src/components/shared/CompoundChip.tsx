import { CHEMICAL_CLASS_LABELS } from '../../data/labels';
import type { AromaCompound } from '../../types/aroma';
import { FormulaText } from './FormulaText';

interface CompoundChipProps {
  compound: AromaCompound;
  intensity?: number;
  showFormula?: boolean;
}

export function CompoundChip({ compound, intensity, showFormula = false }: CompoundChipProps) {
  const tooltip = `${compound.formula} · ${CHEMICAL_CLASS_LABELS[compound.chemicalClass]} · ${compound.descriptors}`;

  return (
    <span className="compound-chip" title={tooltip}>
      {compound.name}
      {showFormula && <FormulaText formula={compound.formula} />}
      {intensity !== undefined && <span className="compound-chip__intensity">{intensity}</span>}
    </span>
  );
}
