import type { CocktailItem } from './cocktail';

export interface SavedRecipe {
  id: string;
  name: string;
  items: CocktailItem[];
  savedAt: string;
}
