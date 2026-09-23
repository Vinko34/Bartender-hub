import { aromaCompoundsById } from '../../data/aromaCompounds';
import { INGREDIENT_CATEGORY_LABELS } from '../../data/labels';
import type { Ingredient } from '../../types/ingredient';
import { CompoundChip } from '../shared/CompoundChip';
import { StockBadge } from '../shared/StockBadge';

const MAX_COMPOUNDS_SHOWN = 3;

interface StockRowProps {
  ingredient: Ingredient;
  onAdjust: (ingredientId: string, delta: number) => void;
  onEdit: (ingredient: Ingredient) => void;
  onRemove: (ingredient: Ingredient) => void;
}

export function StockRow({ ingredient, onAdjust, onEdit, onRemove }: StockRowProps) {
  const adjustmentStep = ingredient.defaultServing;
  const strongestCompounds = [...ingredient.compounds]
    .sort((firstPresence, secondPresence) => secondPresence.intensity - firstPresence.intensity)
    .slice(0, MAX_COMPOUNDS_SHOWN);

  return (
    <tr>
      <td className="stock-table__name">{ingredient.name}</td>
      <td>{INGREDIENT_CATEGORY_LABELS[ingredient.category]}</td>
      <td>
        <div className="quantity-stepper">
          <button type="button" className="icon-button" onClick={() => onAdjust(ingredient.id, -adjustmentStep)}>
            −
          </button>
          <StockBadge ingredient={ingredient} />
          <button type="button" className="icon-button" onClick={() => onAdjust(ingredient.id, adjustmentStep)}>
            +
          </button>
        </div>
      </td>
      <td>
        <div className="chip-row">
          {strongestCompounds.map((presence) => {
            const compound = aromaCompoundsById.get(presence.compoundId);
            return compound ? (
              <CompoundChip key={presence.compoundId} compound={compound} intensity={presence.intensity} />
            ) : null;
          })}
        </div>
      </td>
      <td className="stock-table__actions">
        <button type="button" className="button button--small" onClick={() => onEdit(ingredient)}>
          Uredi
        </button>
        <button type="button" className="button button--small button--danger" onClick={() => onRemove(ingredient)}>
          Obriši
        </button>
      </td>
    </tr>
  );
}
