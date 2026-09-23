import { useState } from 'react';
import { useStockContext } from '../../context/StockContext';
import { createEmptyIngredient } from '../../domain/createEmptyIngredient';
import { useIngredientFilter } from '../../hooks/useIngredientFilter';
import type { Ingredient } from '../../types/ingredient';
import { IngredientEditor } from './IngredientEditor';
import { StockTable } from './StockTable';
import { StockToolbar } from './StockToolbar';

interface EditorState {
  ingredient: Ingredient;
  isNew: boolean;
}

export function StockPage() {
  const { ingredients, saveIngredient, removeIngredient, adjustQuantity, resetToDefaults } = useStockContext();
  const filter = useIngredientFilter(ingredients);
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  const handleRemove = (ingredient: Ingredient) => {
    if (window.confirm(`Obrisati „${ingredient.name}” iz zalihe?`)) {
      removeIngredient(ingredient.id);
    }
  };

  const handleReset = () => {
    if (window.confirm('Vratiti zadanu zalihu? Sve tvoje izmjene bit će izgubljene.')) {
      resetToDefaults();
    }
  };

  const handleSave = (ingredient: Ingredient) => {
    saveIngredient(ingredient);
    setEditorState(null);
  };

  return (
    <main className="page">
      <section className="panel">
        <StockToolbar
          filter={filter}
          onCreate={() => setEditorState({ ingredient: createEmptyIngredient(), isNew: true })}
          onReset={handleReset}
        />
        <StockTable
          ingredients={filter.filteredIngredients}
          onAdjust={adjustQuantity}
          onEdit={(ingredient) => setEditorState({ ingredient, isNew: false })}
          onRemove={handleRemove}
        />
      </section>
      {editorState && (
        <IngredientEditor
          initialIngredient={editorState.ingredient}
          isNew={editorState.isNew}
          onSave={handleSave}
          onCancel={() => setEditorState(null)}
        />
      )}
    </main>
  );
}
