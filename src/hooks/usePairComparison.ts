import { useMemo } from 'react';
import { comparePair } from '../domain/pairComparison';
import type { Ingredient } from '../types/ingredient';

export function usePairComparison(
  firstIngredient: Ingredient | undefined,
  secondIngredient: Ingredient | undefined,
  bridgeCandidates: Ingredient[],
) {
  return useMemo(
    () =>
      firstIngredient && secondIngredient && firstIngredient.id !== secondIngredient.id
        ? comparePair(firstIngredient, secondIngredient, bridgeCandidates)
        : null,
    [firstIngredient, secondIngredient, bridgeCandidates],
  );
}
