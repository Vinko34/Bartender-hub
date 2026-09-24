import type { EnzymeAromaLink as EnzymeAromaLinkData } from '../../types/enzyme';
import { CompoundChipList } from '../shared/CompoundChipList';

export function EnzymeAromaLink({ aromaLink }: { aromaLink: EnzymeAromaLinkData }) {
  return (
    <div className="aroma-link">
      <h4 className="section-label">Veza s aromatskim spojevima</h4>
      <p>{aromaLink.explanation}</p>
      <CompoundChipList compoundIds={aromaLink.compoundIds} />
    </div>
  );
}
