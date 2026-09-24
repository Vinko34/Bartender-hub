import { preparations } from '../data/preparations';
import type { Preparation, PreparationShowcase } from '../types/preparation';

export interface ShowcaseInPreparation {
  preparation: Preparation;
  showcase: PreparationShowcase;
}

export function findShowcasesForIngredient(ingredientId: string): ShowcaseInPreparation[] {
  return preparations.flatMap((preparation) =>
    preparation.showcases
      .filter((showcase) => showcase.ingredientId === ingredientId)
      .map((showcase) => ({ preparation, showcase })),
  );
}
