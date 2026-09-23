import { useCallback, useMemo } from 'react';
import { UNTITLED_COCKTAIL_NAME } from '../data/labels';
import type { CocktailItem } from '../types/cocktail';
import type { SavedRecipe } from '../types/recipe';
import { useLocalStorageState } from './useLocalStorageState';

const RECIPES_STORAGE_KEY = 'cocktail-maister/recipes/v1';

function isSameName(firstName: string, secondName: string): boolean {
  return firstName.toLocaleLowerCase('hr') === secondName.toLocaleLowerCase('hr');
}

export function useSavedRecipes() {
  const [recipes, setRecipes] = useLocalStorageState<SavedRecipe[]>(RECIPES_STORAGE_KEY, () => []);

  /** Saving under an existing name overwrites that recipe. Returns the name used. */
  const saveRecipe = useCallback(
    (name: string, items: CocktailItem[]): string => {
      const recipeName = name.trim() || UNTITLED_COCKTAIL_NAME;
      setRecipes((currentRecipes) => {
        const existingRecipe = currentRecipes.find((recipe) => isSameName(recipe.name, recipeName));
        const savedRecipe: SavedRecipe = {
          id: existingRecipe?.id ?? `recipe-${Date.now().toString(36)}`,
          name: recipeName,
          items,
          savedAt: new Date().toISOString(),
        };
        return existingRecipe
          ? currentRecipes.map((recipe) => (recipe.id === existingRecipe.id ? savedRecipe : recipe))
          : [savedRecipe, ...currentRecipes];
      });
      return recipeName;
    },
    [setRecipes],
  );

  const removeRecipe = useCallback(
    (recipeId: string) => setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== recipeId)),
    [setRecipes],
  );

  return useMemo(() => ({ recipes, saveRecipe, removeRecipe }), [recipes, saveRecipe, removeRecipe]);
}

export type SavedRecipesApi = ReturnType<typeof useSavedRecipes>;
