import { formatStockQuantity, getStockStatus } from '../../domain/formatting';
import type { Ingredient } from '../../types/ingredient';

export function StockBadge({ ingredient }: { ingredient: Ingredient }) {
  const stockStatus = getStockStatus(ingredient);
  if (stockStatus === 'empty') {
    return <span className="stock-badge stock-badge--empty">Nema</span>;
  }
  return (
    <span className={stockStatus === 'low' ? 'stock-badge stock-badge--low' : 'stock-badge'}>
      {formatStockQuantity(ingredient)}
    </span>
  );
}
