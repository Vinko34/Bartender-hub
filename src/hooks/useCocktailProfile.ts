import { useMemo } from 'react';
import { buildCocktailProfile } from '../domain/cocktailProfile';
import type { SelectedIngredient } from '../types/cocktail';

export function useCocktailProfile(selection: SelectedIngredient[]) {
  return useMemo(() => buildCocktailProfile(selection), [selection]);
}
