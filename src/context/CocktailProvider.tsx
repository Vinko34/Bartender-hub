import { useMemo, type ReactNode } from 'react';
import { useCocktailBuilder } from '../hooks/useCocktailBuilder';
import { useSavedRecipes } from '../hooks/useSavedRecipes';
import { CocktailContext } from './CocktailContext';
import { useStockContext } from './StockContext';

export function CocktailProvider({ children }: { children: ReactNode }) {
  const { ingredientsById } = useStockContext();
  const builder = useCocktailBuilder(ingredientsById);
  const savedRecipes = useSavedRecipes();
  const contextValue = useMemo(() => ({ builder, savedRecipes }), [builder, savedRecipes]);
  return <CocktailContext.Provider value={contextValue}>{children}</CocktailContext.Provider>;
}
