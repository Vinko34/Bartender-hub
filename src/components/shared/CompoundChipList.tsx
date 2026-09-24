import { aromaCompoundsById } from '../../data/aromaCompounds';
import { CompoundChip } from './CompoundChip';

export function CompoundChipList({ compoundIds }: { compoundIds: string[] }) {
  return (
    <span className="chip-row">
      {compoundIds.map((compoundId) => {
        const compound = aromaCompoundsById.get(compoundId);
        return compound ? <CompoundChip key={compoundId} compound={compound} showFormula /> : null;
      })}
    </span>
  );
}
