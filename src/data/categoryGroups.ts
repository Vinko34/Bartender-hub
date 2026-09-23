import type { IngredientCategory } from '../types/ingredient';

export type CategoryGroup = 'alcohol' | 'citrus' | 'herbs' | 'spices' | 'sweet' | 'fruit' | 'other';

export const CATEGORY_GROUPS: CategoryGroup[] = ['alcohol', 'citrus', 'herbs', 'spices', 'sweet', 'fruit', 'other'];

export const CATEGORY_GROUP_STYLES: Record<CategoryGroup, { label: string; color: string }> = {
  alcohol: { label: 'Alkohol', color: '#5a2e14' },
  citrus: { label: 'Citrus', color: '#f4a06b' },
  herbs: { label: 'Bilje', color: '#7c8b5c' },
  spices: { label: 'Začin', color: '#b4532a' },
  sweet: { label: 'Slatko', color: '#e2b04a' },
  fruit: { label: 'Voće', color: '#d65a6f' },
  other: { label: 'Ostalo', color: '#9c8b7b' },
};

const GROUP_BY_CATEGORY: Record<IngredientCategory, CategoryGroup> = {
  spirit: 'alcohol',
  liqueur: 'alcohol',
  fortified: 'alcohol',
  citrus: 'citrus',
  fruit: 'fruit',
  herb: 'herbs',
  spice: 'spices',
  sweetener: 'sweet',
  bitters: 'other',
  mixer: 'other',
  other: 'other',
};

export function getCategoryGroup(category: IngredientCategory): CategoryGroup {
  return GROUP_BY_CATEGORY[category];
}
