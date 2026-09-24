import type { Ingredient } from '../types/ingredient';

/** Keeps the bartender's edits and quantities, and appends catalogue ingredients they have never seen. */
export function mergeNewDefaultIngredients(storedIngredients: Ingredient[], defaultIngredients: Ingredient[]): Ingredient[] {
  const storedIds = new Set(storedIngredients.map((ingredient) => ingredient.id));
  const missingDefaults = defaultIngredients.filter((ingredient) => !storedIds.has(ingredient.id));
  return [...storedIngredients, ...missingDefaults];
}

export function readLegacyStock(legacyStorageKey: string): Ingredient[] | null {
  try {
    const storedValue = window.localStorage.getItem(legacyStorageKey);
    return storedValue === null ? null : (JSON.parse(storedValue) as Ingredient[]);
  } catch {
    return null;
  }
}
