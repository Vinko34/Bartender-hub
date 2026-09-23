import type { Ingredient } from '../types/ingredient';

export function createEmptyIngredient(): Ingredient {
  return {
    id: `custom-${Date.now().toString(36)}`,
    name: '',
    category: 'spirit',
    unit: 'ml',
    stockQuantity: 0,
    lowStockThreshold: 300,
    defaultServing: 30,
    taste: { sweet: 0, sour: 0, bitter: 0, alcohol: 0 },
    compounds: [],
  };
}
