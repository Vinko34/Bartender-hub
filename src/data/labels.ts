import type { AromaFamily, ChemicalClass } from '../types/aroma';
import type { IngredientCategory, StockUnit, TasteDimension } from '../types/ingredient';

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  'spirit',
  'liqueur',
  'fortified',
  'citrus',
  'fruit',
  'herb',
  'spice',
  'sweetener',
  'bitters',
  'mixer',
  'other',
];

export const INGREDIENT_CATEGORY_LABELS: Record<IngredientCategory, string> = {
  spirit: 'Žestica',
  liqueur: 'Liker',
  fortified: 'Aromatizirano vino',
  citrus: 'Citrusi',
  fruit: 'Voće',
  herb: 'Bilje',
  spice: 'Začini',
  sweetener: 'Zaslađivači',
  bitters: 'Bitteri',
  mixer: 'Mikseri',
  other: 'Ostalo',
};

export const STOCK_UNITS: StockUnit[] = ['ml', 'g', 'kom'];

export const TASTE_LABELS: Record<TasteDimension, string> = {
  sweet: 'Slatko',
  sour: 'Kiselo',
  bitter: 'Gorko',
  alcohol: 'Alkohol',
};

export const AROMA_FAMILY_STYLES: Record<AromaFamily, { label: string; color: string }> = {
  citrus: { label: 'Citrusno', color: '#f5c542' },
  floral: { label: 'Cvjetno', color: '#e58fd0' },
  herbal: { label: 'Biljno', color: '#6fbf73' },
  woody: { label: 'Drvenasto', color: '#a67c52' },
  spicy: { label: 'Začinsko', color: '#e0703a' },
  fruity: { label: 'Voćno', color: '#f06b7d' },
  tropical: { label: 'Tropsko', color: '#ffa94d' },
  sweet: { label: 'Slatko', color: '#f7d9a8' },
  smoky: { label: 'Dimljeno', color: '#8c8c9a' },
  nutty: { label: 'Orašasto', color: '#c49a6c' },
  green: { label: 'Zeleno', color: '#9ad35b' },
  minty: { label: 'Mentolno', color: '#5ed3c3' },
  earthy: { label: 'Zemljano', color: '#8a7358' },
  bitter: { label: 'Gorko', color: '#b5485d' },
  pungent: { label: 'Ljuto', color: '#ff4d4d' },
};

export const CHEMICAL_CLASS_LABELS: Record<ChemicalClass, string> = {
  monoterpene: 'Monoterpen',
  'terpene-alcohol': 'Terpenski alkohol',
  'terpene-aldehyde': 'Terpenski aldehid',
  'terpene-ketone': 'Terpenski keton',
  sesquiterpene: 'Seskviterpen',
  ester: 'Ester',
  lactone: 'Lakton',
  phenol: 'Fenol',
  phenylpropanoid: 'Fenilpropanoid',
  aldehyde: 'Aldehid',
  ketone: 'Keton',
  alcohol: 'Alkohol',
  furanone: 'Furanon',
  pyranone: 'Piranon',
  norisoprenoid: 'Norizoprenoid',
  thiol: 'Tiol',
  pyrazine: 'Pirazin',
  alkaloid: 'Alkaloid',
  ether: 'Eter (oksid)',
  glycoside: 'Glikozid',
};

export const UNTITLED_COCKTAIL_NAME = 'Bez imena';
