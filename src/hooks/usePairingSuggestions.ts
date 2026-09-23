import { useMemo } from 'react';
import { suggestPairings } from '../domain/pairing';
import type { SelectedIngredient } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';

const SUGGESTION_LIMIT = 12;

export function usePairingSuggestions(
  selection: SelectedIngredient[],
  ingredients: Ingredient[],
  includeOutOfStock: boolean,
) {
  return useMemo(
    () => suggestPairings(selection, ingredients, { includeOutOfStock, limit: SUGGESTION_LIMIT }),
    [selection, ingredients, includeOutOfStock],
  );
}
