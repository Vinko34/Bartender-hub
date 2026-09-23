import { useMemo } from 'react';
import type { Ingredient } from '../types/ingredient';

export interface CompoundUsage {
  ingredient: Ingredient;
  intensity: number;
}

export function useCompoundUsage(ingredients: Ingredient[]) {
  return useMemo(() => {
    const usageByCompoundId = new Map<string, CompoundUsage[]>();
    for (const ingredient of ingredients) {
      for (const presence of ingredient.compounds) {
        const usages = usageByCompoundId.get(presence.compoundId) ?? [];
        usages.push({ ingredient, intensity: presence.intensity });
        usageByCompoundId.set(presence.compoundId, usages);
      }
    }
    for (const usages of usageByCompoundId.values()) {
      usages.sort((firstUsage, secondUsage) => secondUsage.intensity - firstUsage.intensity);
    }
    return usageByCompoundId;
  }, [ingredients]);
}
