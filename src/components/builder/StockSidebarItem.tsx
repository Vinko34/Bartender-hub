import { formatStockQuantity, getStockStatus } from '../../domain/formatting';
import { getStrongestCompounds } from '../../domain/ingredientSummary';
import type { Ingredient } from '../../types/ingredient';
import { IngredientDot } from '../shared/IngredientDot';
import { StockLevelBar } from '../shared/StockLevelBar';

const COMPOUNDS_SHOWN = 3;

interface StockSidebarItemProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (ingredient: Ingredient) => void;
}

export function StockSidebarItem({ ingredient, isSelected, onToggle }: StockSidebarItemProps) {
  const stockStatus = getStockStatus(ingredient);
  const compoundNames = getStrongestCompounds(ingredient, COMPOUNDS_SHOWN).map((compound) => compound.name);

  return (
    <button
      type="button"
      className={isSelected ? 'stock-item stock-item--selected' : 'stock-item'}
      aria-pressed={isSelected}
      onClick={() => onToggle(ingredient)}
    >
      <IngredientDot category={ingredient.category} />
      <span className="stock-item__body">
        <span className="stock-item__name">
          {ingredient.name}
          {stockStatus === 'low' && <span className="stock-item__warning">pri kraju</span>}
          {stockStatus === 'empty' && <span className="stock-item__warning">nema</span>}
        </span>
        {compoundNames.length > 0 && <span className="stock-item__compounds">{compoundNames.join(' · ')}</span>}
        <span className="stock-item__level">
          <StockLevelBar ingredient={ingredient} />
          <span className="stock-item__quantity">{formatStockQuantity(ingredient)}</span>
        </span>
      </span>
      <span className={isSelected ? 'round-toggle round-toggle--on' : 'round-toggle'} aria-hidden="true">
        {isSelected ? '✓' : '+'}
      </span>
    </button>
  );
}
