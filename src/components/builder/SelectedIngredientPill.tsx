import { CATEGORY_GROUP_STYLES, getCategoryGroup } from '../../data/categoryGroups';
import { getStrongestCompounds } from '../../domain/ingredientSummary';
import type { SelectedIngredient } from '../../types/cocktail';
import { IngredientDot } from '../shared/IngredientDot';

const COMPOUNDS_SHOWN = 2;

interface SelectedIngredientPillProps {
  item: SelectedIngredient;
  onAmountChange: (ingredientId: string, amount: number) => void;
  onRemove: (ingredientId: string) => void;
}

export function SelectedIngredientPill({ item, onAmountChange, onRemove }: SelectedIngredientPillProps) {
  const { ingredient, amount } = item;
  const isShort = amount > ingredient.stockQuantity;
  const groupLabel = CATEGORY_GROUP_STYLES[getCategoryGroup(ingredient.category)].label;
  const summary = [groupLabel, ...getStrongestCompounds(ingredient, COMPOUNDS_SHOWN).map((compound) => compound.name)];

  return (
    <li className="ingredient-pill">
      <IngredientDot category={ingredient.category} size="large" />
      <span className="ingredient-pill__body">
        <span className="ingredient-pill__name">{ingredient.name}</span>
        <span className="ingredient-pill__summary">{summary.join(' · ')}</span>
      </span>
      <label className={isShort ? 'amount-field amount-field--short' : 'amount-field'}>
        <input
          type="number"
          min={0}
          step={ingredient.unit === 'ml' ? 5 : 1}
          value={amount}
          aria-label={`Količina: ${ingredient.name}`}
          title={isShort ? `Na zalihi samo ${ingredient.stockQuantity} ${ingredient.unit}` : undefined}
          onChange={(event) => onAmountChange(ingredient.id, Number(event.target.value))}
        />
        <span>{ingredient.unit}</span>
      </label>
      <button
        type="button"
        className="ingredient-pill__remove"
        aria-label={`Ukloni ${ingredient.name}`}
        onClick={() => onRemove(ingredient.id)}
      >
        ×
      </button>
    </li>
  );
}
