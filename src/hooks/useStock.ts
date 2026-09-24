import { useCallback, useMemo } from 'react';
import { defaultIngredients } from '../data/defaultIngredients';
import { mergeNewDefaultIngredients, readLegacyStock } from '../domain/stockMigration';
import type { CocktailItem } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';
import { useLocalStorageState } from './useLocalStorageState';

const LEGACY_STOCK_STORAGE_KEY = 'cocktail-maister/stock/v1';
/** v2 added peels, pandan, elderflower, tea and milk for the preparations guide. */
const STOCK_STORAGE_KEY = 'cocktail-maister/stock/v2';

function createInitialStock(): Ingredient[] {
  const legacyStock = readLegacyStock(LEGACY_STOCK_STORAGE_KEY);
  return legacyStock ? mergeNewDefaultIngredients(legacyStock, defaultIngredients) : defaultIngredients;
}

export interface StockApi {
  ingredients: Ingredient[];
  ingredientsById: Map<string, Ingredient>;
  /** Stock first, falling back to the default catalogue – lets guides show ingredients the bar has deleted. */
  catalogById: Map<string, Ingredient>;
  saveIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientId: string) => void;
  adjustQuantity: (ingredientId: string, delta: number) => void;
  consumeIngredients: (usages: CocktailItem[]) => void;
  resetToDefaults: () => void;
}

export function useStock(): StockApi {
  const [ingredients, setIngredients] = useLocalStorageState<Ingredient[]>(STOCK_STORAGE_KEY, createInitialStock);

  const ingredientsById = useMemo(
    () => new Map(ingredients.map((ingredient) => [ingredient.id, ingredient])),
    [ingredients],
  );

  const catalogById = useMemo(
    () => new Map([...defaultIngredients, ...ingredients].map((ingredient) => [ingredient.id, ingredient])),
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
      catalogById,
      saveIngredient,
      removeIngredient,
      adjustQuantity,
      consumeIngredients,
      resetToDefaults,
    }),
    [ingredients, ingredientsById, catalogById, saveIngredient, removeIngredient, adjustQuantity, consumeIngredients, resetToDefaults],
  );
}
