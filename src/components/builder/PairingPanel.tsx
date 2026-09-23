import type { PairingSuggestion } from '../../domain/pairing';
import type { Ingredient } from '../../types/ingredient';
import { PairingCard } from './PairingCard';

interface PairingPanelProps {
  suggestions: PairingSuggestion[];
  hasSelection: boolean;
  includeOutOfStock: boolean;
  onIncludeOutOfStockChange: (includeOutOfStock: boolean) => void;
  onAdd: (ingredient: Ingredient) => void;
}

export function PairingPanel({
  suggestions,
  hasSelection,
  includeOutOfStock,
  onIncludeOutOfStockChange,
  onAdd,
}: PairingPanelProps) {
  const topScore = suggestions[0]?.score ?? 0;

  return (
    <section className="pairing-panel">
      <h2 className="display-heading">Paše uz mješavinu</h2>
      <div className="pairing-panel__subheading">
        <span className="muted">Rangirano po zajedničkim spojevima</span>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={includeOutOfStock}
            onChange={(event) => onIncludeOutOfStockChange(event.target.checked)}
          />
          i bez zalihe
        </label>
      </div>
      {!hasSelection && <p className="empty-hint">Preporuke se pojavljuju čim odabereš prvi sastojak.</p>}
      {hasSelection && suggestions.length === 0 && <p className="empty-hint">Nema odgovarajućih sastojaka.</p>}
      <ul className="pairing-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion.ingredient.id}>
            <PairingCard suggestion={suggestion} topScore={topScore} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </section>
  );
}
