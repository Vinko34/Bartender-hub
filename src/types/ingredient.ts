export type IngredientCategory =
  | 'spirit'
  | 'liqueur'
  | 'fortified'
  | 'citrus'
  | 'fruit'
  | 'herb'
  | 'spice'
  | 'sweetener'
  | 'bitters'
  | 'mixer'
  | 'other';

export type StockUnit = 'ml' | 'g' | 'kom';

export const TASTE_DIMENSIONS = ['sweet', 'sour', 'bitter', 'alcohol'] as const;

export type TasteDimension = (typeof TASTE_DIMENSIONS)[number];

/** Each dimension is scored 0–10. */
export type TasteProfile = Record<TasteDimension, number>;

export interface CompoundPresence {
  compoundId: string;
  /** 1 (trace) – 5 (dominant) */
  intensity: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  unit: StockUnit;
  stockQuantity: number;
  lowStockThreshold: number;
  defaultServing: number;
  taste: TasteProfile;
  compounds: CompoundPresence[];
}
