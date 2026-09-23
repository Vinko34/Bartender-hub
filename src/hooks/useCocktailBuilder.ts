import { useCallback, useMemo } from 'react';
import type { CocktailItem, SelectedIngredient } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';
import type { SavedRecipe } from '../types/recipe';
import { useLocalStorageState } from './useLocalStorageState';

const BUILDER_STORAGE_KEY = 'cocktail-maister/builder/v2';

interface BuilderState {
  name: string;
  items: CocktailItem[];
}

export function useCocktailBuilder(ingredientsById: Map<string, Ingredient>) {
  const [builderState, setBuilderState] = useLocalStorageState<BuilderState>(BUILDER_STORAGE_KEY, () => ({
    name: '',
    items: [],
  }));

  const updateItems = useCallback(
    (transformItems: (items: CocktailItem[]) => CocktailItem[]) =>
      setBuilderState((currentState) => ({ ...currentState, items: transformItems(currentState.items) })),
    [setBuilderState],
  );

  const addIngredient = useCallback(
    (ingredient: Ingredient) =>
      updateItems((items) =>
        items.some((item) => item.ingredientId === ingredient.id)
          ? items
          : [...items, { ingredientId: ingredient.id, amount: ingredient.defaultServing }],
      ),
    [updateItems],
  );

  const removeIngredient = useCallback(
    (ingredientId: string) => updateItems((items) => items.filter((item) => item.ingredientId !== ingredientId)),
    [updateItems],
  );

  const toggleIngredient = useCallback(
    (ingredient: Ingredient) =>
      updateItems((items) =>
        items.some((item) => item.ingredientId === ingredient.id)
          ? items.filter((item) => item.ingredientId !== ingredient.id)
          : [...items, { ingredientId: ingredient.id, amount: ingredient.defaultServing }],
      ),
    [updateItems],
  );

  const setAmount = useCallback(
    (ingredientId: string, amount: number) =>
      updateItems((items) =>
        items.map((item) => (item.ingredientId === ingredientId ? { ...item, amount: Math.max(0, amount) } : item)),
      ),
    [updateItems],
  );

  const setName = useCallback(
    (name: string) => setBuilderState((currentState) => ({ ...currentState, name })),
    [setBuilderState],
  );

  const clear = useCallback(() => setBuilderState({ name: '', items: [] }), [setBuilderState]);

  const loadRecipe = useCallback(
    (recipe: SavedRecipe) => setBuilderState({ name: recipe.name, items: recipe.items }),
    [setBuilderState],
  );

  const selection = useMemo<SelectedIngredient[]>(
    () =>
      builderState.items.flatMap((item) => {
        const ingredient = ingredientsById.get(item.ingredientId);
        return ingredient ? [{ ingredient, amount: item.amount }] : [];
      }),
    [builderState.items, ingredientsById],
  );

  return {
    name: builderState.name,
    items: builderState.items,
    selection,
    addIngredient,
    removeIngredient,
    toggleIngredient,
    setAmount,
    setName,
    clear,
    loadRecipe,
  };
}

export type CocktailBuilderApi = ReturnType<typeof useCocktailBuilder>;
