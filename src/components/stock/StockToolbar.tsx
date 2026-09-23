import type { IngredientFilterState } from '../../hooks/useIngredientFilter';
import { IngredientFilterBar } from '../shared/IngredientFilterBar';

interface StockToolbarProps {
  filter: IngredientFilterState;
  onCreate: () => void;
  onReset: () => void;
}

export function StockToolbar({ filter, onCreate, onReset }: StockToolbarProps) {
  return (
    <div className="stock-toolbar">
      <h2 className="display-heading">Zaliha</h2>
      <IngredientFilterBar filter={filter} />
      <div className="stock-toolbar__actions">
        <button type="button" className="button button--ghost" onClick={onReset}>
          Vrati zadano
        </button>
        <button type="button" className="button button--primary" onClick={onCreate}>
          + Nova komponenta
        </button>
      </div>
    </div>
  );
}
