export type PreparationId = 'hot-syrup' | 'cold-syrup' | 'cordial' | 'oleo-saccharum' | 'infusion' | 'milk-wash';

export type PreparationFamily = 'syrup' | 'cordial' | 'infusion' | 'clarification';

/** A curated "this ingredient shines here, and here is the chemistry why". */
export interface PreparationShowcase {
  ingredientId: string;
  headline: string;
  explanation: string;
  keyCompoundIds: string[];
}

export interface Preparation {
  id: PreparationId;
  family: PreparationFamily;
  name: string;
  tagline: string;
  definition: string;
  mechanism: string[];
  baseRatio: string;
  steps: string[];
  shelfLife: string;
  bestFor: string[];
  watchOut: string[];
  showcases: PreparationShowcase[];
}
