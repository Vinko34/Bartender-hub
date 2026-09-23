import { useCocktailContext } from '../../context/CocktailContext';
import { useStockContext } from '../../context/StockContext';
import { useTransientMessage } from '../../hooks/useTransientMessage';
import type { SavedRecipe } from '../../types/recipe';
import { RecipeCard } from './RecipeCard';

export function RecipesPage({ onOpenWorkbench }: { onOpenWorkbench: () => void }) {
  const { ingredientsById, consumeIngredients } = useStockContext();
  const { builder, savedRecipes } = useCocktailContext();
  const { message, showMessage } = useTransientMessage();

  const handleLoad = (recipe: SavedRecipe) => {
    builder.loadRecipe(recipe);
    onOpenWorkbench();
  };

  const handleBrew = (recipe: SavedRecipe) => {
    consumeIngredients(recipe.items);
    showMessage(`„${recipe.name}” napravljen – zaliha je ažurirana.`);
  };

  const handleRemove = (recipe: SavedRecipe) => {
    if (window.confirm(`Obrisati recept „${recipe.name}”?`)) {
      savedRecipes.removeRecipe(recipe.id);
    }
  };

  return (
    <main className="page">
      <div className="page__heading">
        <h2 className="display-heading">Recepti</h2>
        {message && <p className="status-message">{message}</p>}
      </div>
      {savedRecipes.recipes.length === 0 ? (
        <p className="empty-hint">Još nema spremljenih recepata. Sastavi koktel na radnom stolu i klikni „Spremi recept”.</p>
      ) : (
        <div className="recipe-grid">
          {savedRecipes.recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              ingredientsById={ingredientsById}
              onLoad={handleLoad}
              onBrew={handleBrew}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </main>
  );
}
