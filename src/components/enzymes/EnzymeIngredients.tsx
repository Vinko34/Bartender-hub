import { useStockContext } from '../../context/StockContext';
import { IngredientDot } from '../shared/IngredientDot';

export function EnzymeIngredients({ ingredientIds }: { ingredientIds: string[] }) {
  const { catalogById } = useStockContext();
  const ingredients = ingredientIds.flatMap((ingredientId) => {
    const ingredient = catalogById.get(ingredientId);
    return ingredient ? [ingredient] : [];
  });
  if (ingredients.length === 0) return null;

  return (
    <footer className="enzyme-card__ingredients">
      <span className="muted">Prirodno u zalihi:</span>
      {ingredients.map((ingredient) => (
        <span key={ingredient.id} className="bridge-chip">
          <IngredientDot category={ingredient.category} />
          {ingredient.name}
        </span>
      ))}
    </footer>
  );
}
