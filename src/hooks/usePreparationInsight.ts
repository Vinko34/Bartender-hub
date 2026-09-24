import { useMemo } from 'react';
import { calculateExtractionProfile, recommendPreparation } from '../domain/extractionProfile';
import { findShowcasesForIngredient } from '../domain/preparationLookup';
import type { Ingredient } from '../types/ingredient';

export function usePreparationInsight(ingredient: Ingredient | undefined) {
  return useMemo(() => {
    if (!ingredient) return null;
    const profile = calculateExtractionProfile(ingredient);
    return {
      profile,
      showcases: findShowcasesForIngredient(ingredient.id),
      recommendation: recommendPreparation(ingredient, profile),
    };
  }, [ingredient]);
}
