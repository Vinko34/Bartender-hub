import { useCallback, useMemo } from 'react';
import { defaultIngredients } from '../data/defaultIngredients';
import type { CocktailItem } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';
import { useLocalStorageState } from './useLocalStorageState';

const STOCK_STORAGE_KEY = 'cocktail-maister/stock/v1';

export interface StockApi {
  ingredients: Ingredient[];
  ingredientsById: Map<string, Ingredient>;
  saveIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientId: string) => void;
  adjustQuantity: (ingredientId: string, delta: number) => void;
  consumeIngredients: (usages: CocktailItem[]) => void;
  resetToDefaults: () => void;
}

export function useStock(): StockApi {
  const [ingredients, setIngredients] = useLocalStorageState<Ingredient[]>(STOCK_STORAGE_KEY, () => defaultIngredients);

  const ingredientsById = useMemo(
    () => new Map(ingredients.map((ingredient) => [ingredient.id, ingredient])),
    [ingredients],
  );

  const saveIngredient = useCallback(
    (savedIngredient: Ingredient) =>
      setIngredients((currentIngredients) =>
        currentIngredients.some((ingredient) => ingredient.id === savedIngredient.id)
          ? currentIngredients.map((ingredient) => (ingredient.id === savedIngredient.id ? savedIngredient : ingredient))
          : [...currentIngredients, savedIngredient],
      ),
    [setIngredients],
  );

  const removeIngredient = useCallback(
    (ingredientId: string) =>
      setIngredients((currentIngredients) => currentIngredients.filter((ingredient) => ingredient.id !== ingredientId)),
    [setIngredients],
  );

  const adjustQuantity = useCallback(
    (ingredientId: string, delta: number) =>
      setIngredients((currentIngredients) =>
        currentIngredients.map((ingredient) =>
          ingredient.id === ingredientId
            ? { ...ingredient, stockQuantity: Math.max(0, ingredient.stockQuantity + delta) }
            : ingredient,
        ),
      ),
    [setIngredients],
  );

  const consumeIngredients = useCallback(
    (usages: CocktailItem[]) => {
      const usedAmountById = new Map(usages.map((usage) => [usage.ingredientId, usage.amount]));
      setIngredients((currentIngredients) =>
        currentIngredients.map((ingredient) => {
          const usedAmount = usedAmountById.get(ingredient.id);
          return usedAmount
            ? { ...ingredient, stockQuantity: Math.max(0, ingredient.stockQuantity - usedAmount) }
            : ingredient;
        }),
      );
    },
    [setIngredients],
  );

  const resetToDefaults = useCallback(() => setIngredients(defaultIngredients), [setIngredients]);

  return useMemo(
    () => ({
      ingredients,
      ingredientsById,
      saveIngredient,
      removeIngredient,
      adjustQuantity,
      consumeIngredients,
      resetToDefaults,
    }),
    [ingredients, ingredientsById, saveIngredient, removeIngredient, adjustQuantity, consumeIngredients, resetToDefaults],
  );
}
