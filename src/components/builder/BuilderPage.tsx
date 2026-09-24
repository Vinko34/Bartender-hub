import { useMemo, useState } from 'react';
import { useCocktailContext } from '../../context/CocktailContext';
import { useStockContext } from '../../context/StockContext';
import { useCocktailProfile } from '../../hooks/useCocktailProfile';
import { usePairingSuggestions } from '../../hooks/usePairingSuggestions';
import { useTransientMessage } from '../../hooks/useTransientMessage';
import { CocktailWorkbench } from './CocktailWorkbench';
import { PairingPanel } from './PairingPanel';
import { StockSidebar } from './StockSidebar';

export function BuilderPage() {
  const { ingredients, ingredientsById, consumeIngredients } = useStockContext();
  const { builder, savedRecipes } = useCocktailContext();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const suggestions = usePairingSuggestions(builder.selection, ingredients, includeOutOfStock);
  const profile = useCocktailProfile(builder.selection);
  const selectedIds = useMemo(() => new Set(builder.items.map((item) => item.ingredientId)), [builder.items]);
  const { message, showMessage } = useTransientMessage();

  const handleSave = () => {
    const savedName = savedRecipes.saveRecipe(builder.name, builder.items);
    showMessage(`Recept „${savedName}” je spremljen.`);
  };

  const handleBrew = () => {
    consumeIngredients(builder.items);
    showMessage('Koktel napravljen – zaliha je ažurirana.');
  };

  const handleQuickStart = (ingredientIds: string[]) =>
    builder.startWithIngredients(
      ingredientIds.flatMap((ingredientId) => {
        const ingredient = ingredientsById.get(ingredientId);
        return ingredient ? [ingredient] : [];
      }),
    );

  return (
    <main className="workspace">
      <StockSidebar ingredients={ingredients} selectedIds={selectedIds} onToggle={builder.toggleIngredient} />
      <CocktailWorkbench
        name={builder.name}
        selection={builder.selection}
        profile={profile}
        statusMessage={message}
        onNameChange={builder.setName}
        onAmountChange={builder.setAmount}
        onRemove={builder.removeIngredient}
        onClear={builder.clear}
        onBrew={handleBrew}
        onSave={handleSave}
        onQuickStart={handleQuickStart}
      />
      <PairingPanel
        suggestions={suggestions}
        hasSelection={builder.selection.length > 0}
        includeOutOfStock={includeOutOfStock}
        onIncludeOutOfStockChange={setIncludeOutOfStock}
        onAdd={builder.addIngredient}
      />
    </main>
  );
}
