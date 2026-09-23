import type { Ingredient } from '../../types/ingredient';
import { StockRow } from './StockRow';

interface StockTableProps {
  ingredients: Ingredient[];
  onAdjust: (ingredientId: string, delta: number) => void;
  onEdit: (ingredient: Ingredient) => void;
  onRemove: (ingredient: Ingredient) => void;
}

export function StockTable({ ingredients, onAdjust, onEdit, onRemove }: StockTableProps) {
  if (ingredients.length === 0) {
    return <p className="empty-hint">Nema komponenti za prikaz.</p>;
  }
  return (
    <div className="table-scroll">
      <table className="stock-table">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Zaliha</th>
            <th>Glavni aromatski spojevi</th>
            <th aria-label="Akcije" />
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <StockRow
              key={ingredient.id}
              ingredient={ingredient}
              onAdjust={onAdjust}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
