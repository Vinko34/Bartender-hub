import { aromaCompoundsById } from '../data/aromaCompounds';
import type { Ingredient } from '../types/ingredient';
import type { SparseVector } from './vectorMath';

export function buildCompoundVector(ingredient: Ingredient): SparseVector {
  return new Map(ingredient.compounds.map((presence) => [presence.compoundId, presence.intensity]));
}

/** Collapses compounds into aroma families so that e.g. two different citrus molecules still relate. */
export function buildFamilyVector(ingredient: Ingredient): SparseVector {
  const familyVector: SparseVector = new Map();
  for (const presence of ingredient.compounds) {
    const compound = aromaCompoundsById.get(presence.compoundId);
    if (!compound) continue;
    for (const family of compound.families) {
      familyVector.set(family, (familyVector.get(family) ?? 0) + presence.intensity);
    }
  }
  return familyVector;
}
