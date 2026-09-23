import { CATEGORY_GROUP_STYLES, getCategoryGroup } from '../../data/categoryGroups';
import { formatStockQuantity } from '../../domain/formatting';
import type { PairingSuggestion } from '../../domain/pairing';
import type { Ingredient } from '../../types/ingredient';
import { CompoundChip } from '../shared/CompoundChip';

const SHARED_COMPOUNDS_SHOWN = 4;

interface PairingCardProps {
  suggestion: PairingSuggestion;
  /** Percentages are shown relative to the best match, like a ranking. */
  topScore: number;
  onAdd: (ingredient: Ingredient) => void;
}

export function PairingCard({ suggestion, topScore, onAdd }: PairingCardProps) {
  const { ingredient, score, sharedCompounds, reasons } = suggestion;
  const relativePercent = topScore > 0 ? Math.round((score / topScore) * 100) : 0;
  const groupLabel = CATEGORY_GROUP_STYLES[getCategoryGroup(ingredient.category)].label;

  return (
    <button
      type="button"
      className="pairing-card"
      title={`Dodaj ${ingredient.name} u koktel`}
      onClick={() => onAdd(ingredient)}
    >
      <span className="pairing-card__header">
        <span className="pairing-card__percent">{relativePercent}%</span>
        <span>
          <span className="pairing-card__name">{ingredient.name}</span>
          <span className="pairing-card__meta">
            {groupLabel} · {formatStockQuantity(ingredient)}
          </span>
        </span>
        <span className="pairing-card__add" aria-hidden="true">
          +
        </span>
      </span>
      {sharedCompounds.length > 0 && (
        <span className="pairing-card__shared">
          <span className="muted">dijeli</span>
          {sharedCompounds.slice(0, SHARED_COMPOUNDS_SHOWN).map((match) => (
            <CompoundChip key={match.compound.id} compound={match.compound} showFormula />
          ))}
        </span>
      )}
      {reasons.length > 0 && <span className="pairing-card__reasons">{reasons.join(' · ')}</span>}
    </button>
  );
}
