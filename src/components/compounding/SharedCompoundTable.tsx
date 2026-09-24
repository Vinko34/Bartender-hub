import type { CompoundOverlap } from '../../domain/pairComparison';
import { FormulaText } from '../shared/FormulaText';

const MAX_INTENSITY = 5;

interface SharedCompoundTableProps {
  overlaps: CompoundOverlap[];
  firstName: string;
  secondName: string;
}

export function SharedCompoundTable({ overlaps, firstName, secondName }: SharedCompoundTableProps) {
  if (overlaps.length === 0) {
    return (
      <p className="empty-hint">
        Nemaju nijednu zajedničku molekulu – spoj bi se oslanjao na kontrast ili na most (vidi ispod).
      </p>
    );
  }
  return (
    <div className="overlap">
      <h3 className="section-label">Zajedničke molekule</h3>
      <div className="overlap__legend muted">
        <span>{firstName}</span>
        <span>{secondName}</span>
      </div>
      <ul className="overlap__list">
        {overlaps.map(({ compound, firstIntensity, secondIntensity }) => (
          <li key={compound.id} className="overlap-row">
            <span className="overlap-row__bar overlap-row__bar--left">
              <span style={{ width: `${(firstIntensity / MAX_INTENSITY) * 100}%` }} />
            </span>
            <span className="overlap-row__label">
              <strong>{compound.name}</strong>
              <span className="muted">
                <FormulaText formula={compound.formula} /> · {compound.descriptors}
              </span>
            </span>
            <span className="overlap-row__bar">
              <span style={{ width: `${(secondIntensity / MAX_INTENSITY) * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
