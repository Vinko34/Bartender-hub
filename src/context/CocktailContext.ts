import { createContext, useContext } from 'react';
import type { CocktailBuilderApi } from '../hooks/useCocktailBuilder';
import type { SavedRecipesApi } from '../hooks/useSavedRecipes';

export interface CocktailContextValue {
  builder: CocktailBuilderApi;
  savedRecipes: SavedRecipesApi;
}

export const CocktailContext = createContext<CocktailContextValue | null>(null);

export function useCocktailContext(): CocktailContextValue {
  const contextValue = useContext(CocktailContext);
  if (!contextValue) {
    throw new Error('useCocktailContext must be used inside <CocktailProvider>');
  }
  return contextValue;
}
