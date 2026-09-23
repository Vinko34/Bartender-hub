import type { CompoundShare } from '../../domain/cocktailProfile';
import { FormulaText } from '../shared/FormulaText';

interface CompoundShareRowProps {
  compoundShare: CompoundShare;
  /** Bars are drawn relative to the dominant compound. */
  largestShare: number;
}

export function CompoundShareRow({ compoundShare, largestShare }: CompoundShareRowProps) {
  const { compound, share } = compoundShare;
  const barPercent = largestShare > 0 ? (share / largestShare) * 100 : 0;

  return (
    <li className="share-row">
      <span className="share-row__label">
        <strong>{compound.name}</strong>
        <span className="muted">
          <FormulaText formula={compound.formula} /> · {compound.descriptors}
        </span>
      </span>
      <span className="share-row__track">
        <span className="share-row__fill" style={{ width: `${barPercent}%` }} />
      </span>
      <span className="share-row__percent">{Math.round(share * 100)}%</span>
    </li>
  );
}
