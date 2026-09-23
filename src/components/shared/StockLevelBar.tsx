import { calculateStockFill, getStockStatus } from '../../domain/formatting';
import type { Ingredient } from '../../types/ingredient';

export function StockLevelBar({ ingredient }: { ingredient: Ingredient }) {
  const isLow = getStockStatus(ingredient) !== 'ok';
  return (
    <span className="level-bar">
      <span
        className={isLow ? 'level-bar__fill level-bar__fill--low' : 'level-bar__fill'}
        style={{ width: `${calculateStockFill(ingredient) * 100}%` }}
      />
    </span>
  );
}
