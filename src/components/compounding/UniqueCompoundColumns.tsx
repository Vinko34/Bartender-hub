import type { CompoundOnlyIn } from '../../domain/pairComparison';
import { CompoundChip } from '../shared/CompoundChip';

interface UniqueCompoundColumnsProps {
  firstName: string;
  secondName: string;
  onlyInFirst: CompoundOnlyIn[];
  onlyInSecond: CompoundOnlyIn[];
}

function UniqueColumn({ title, entries }: { title: string; entries: CompoundOnlyIn[] }) {
  return (
    <div>
      <h4 className="section-label">Samo u: {title}</h4>
      {entries.length === 0 ? (
        <p className="muted">Ništa – sve dijeli.</p>
      ) : (
        <div className="chip-row">
          {entries.map((entry) => (
            <CompoundChip key={entry.compound.id} compound={entry.compound} intensity={entry.intensity} />
          ))}
        </div>
      )}
    </div>
  );
}

export function UniqueCompoundColumns({ firstName, secondName, onlyInFirst, onlyInSecond }: UniqueCompoundColumnsProps) {
  return (
    <div className="unique-columns">
      <UniqueColumn title={firstName} entries={onlyInFirst} />
      <UniqueColumn title={secondName} entries={onlyInSecond} />
    </div>
  );
}
