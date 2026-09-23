import type { Ingredient } from './ingredient';

export interface CocktailItem {
  ingredientId: string;
  amount: number;
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  amount: number;
}
