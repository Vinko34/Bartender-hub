import { TASTE_LABELS } from '../../data/labels';
import type { TasteNeeds } from '../../domain/tasteBalance';
import { TASTE_DIMENSIONS, type TasteProfile } from '../../types/ingredient';
import { MeterBar } from '../shared/MeterBar';
import { TasteNeedHints } from './TasteNeedHints';

const TASTE_SCALE_MAX = 10;

interface TasteBalanceProps {
  taste: TasteProfile;
  needs: TasteNeeds;
}

export function TasteBalance({ taste, needs }: TasteBalanceProps) {
  return (
    <div className="taste-balance">
      <h4>Ravnoteža okusa</h4>
      <div className="taste-balance__meters">
        {TASTE_DIMENSIONS.map((dimension) => (
          <MeterBar
            key={dimension}
            label={TASTE_LABELS[dimension]}
            fraction={taste[dimension] / TASTE_SCALE_MAX}
            valueText={taste[dimension].toFixed(1)}
          />
        ))}
      </div>
      <TasteNeedHints needs={needs} />
    </div>
  );
}
