import { formatAmount } from '../../domain/formatting';
import type { Ingredient } from '../../types/ingredient';
import type { SavedRecipe } from '../../types/recipe';
import { IngredientDot } from '../shared/IngredientDot';

interface RecipeCardProps {
  recipe: SavedRecipe;
  ingredientsById: Map<string, Ingredient>;
  onLoad: (recipe: SavedRecipe) => void;
  onBrew: (recipe: SavedRecipe) => void;
  onRemove: (recipe: SavedRecipe) => void;
}

export function RecipeCard({ recipe, ingredientsById, onLoad, onBrew, onRemove }: RecipeCardProps) {
  const savedDate = new Date(recipe.savedAt).toLocaleDateString('hr-HR');

  return (
    <article className="recipe-card">
      <header>
        <h3 className="display-heading">{recipe.name}</h3>
        <span className="muted">{savedDate}</span>
      </header>
      <ul className="recipe-card__items">
        {recipe.items.map((item) => {
          const ingredient = ingredientsById.get(item.ingredientId);
          return (
            <li key={item.ingredientId}>
              {ingredient ? (
                <>
                  <IngredientDot category={ingredient.category} />
                  <span>{ingredient.name}</span>
                  <strong>{formatAmount(item.amount, ingredient.unit)}</strong>
                </>
              ) : (
                <span className="muted">Obrisan sastojak</span>
              )}
            </li>
          );
        })}
      </ul>
      <footer className="recipe-card__actions">
        <button type="button" className="text-button text-button--danger" onClick={() => onRemove(recipe)}>
          Obriši
        </button>
        <button type="button" className="text-button" onClick={() => onBrew(recipe)}>
          Napravi
        </button>
        <button type="button" className="accent-button" onClick={() => onLoad(recipe)}>
          Na radni stol
        </button>
      </footer>
    </article>
  );
}
