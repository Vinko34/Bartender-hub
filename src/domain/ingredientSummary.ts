import { aromaCompoundsById } from '../data/aromaCompounds';
import type { AromaCompound } from '../types/aroma';
import type { Ingredient } from '../types/ingredient';

export function getStrongestCompounds(ingredient: Ingredient, count: number): AromaCompound[] {
  return [...ingredient.compounds]
    .sort((firstPresence, secondPresence) => secondPresence.intensity - firstPresence.intensity)
    .flatMap((presence) => {
      const compound = aromaCompoundsById.get(presence.compoundId);
      return compound ? [compound] : [];
    })
    .slice(0, count);
}
