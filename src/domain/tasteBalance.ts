import type { SelectedIngredient } from '../types/cocktail';
import { TASTE_DIMENSIONS, type Ingredient, type TasteProfile } from '../types/ingredient';

const BASE_SPIRIT_ALCOHOL_THRESHOLD = 7;
const IMBALANCE_TOLERANCE = 1.5;
const BITTERNESS_COUNTERWEIGHT = 0.5;

export interface TasteNeeds {
  needsBase: boolean;
  needsAcidity: boolean;
  needsSweetness: boolean;
}

export interface BalanceFit {
  /** Roughly -0.5 (makes balance worse) … 1 (fixes what is missing). */
  score: number;
  reasons: string[];
}

/** Amount in the ingredient's own unit; one leaf, slice or gram weighs like one ml, keeping garnishes minor. */
export function getTasteWeight(item: SelectedIngredient): number {
  return item.amount;
}

export function calculateAverageTaste(selection: SelectedIngredient[]): TasteProfile {
  const averageTaste: TasteProfile = { sweet: 0, sour: 0, bitter: 0, alcohol: 0 };
  const totalWeight = selection.reduce((sum, item) => sum + getTasteWeight(item), 0);
  if (totalWeight === 0) {
    return averageTaste;
  }
  for (const dimension of TASTE_DIMENSIONS) {
    const weightedSum = selection.reduce(
      (sum, item) => sum + item.ingredient.taste[dimension] * getTasteWeight(item),
      0,
    );
    averageTaste[dimension] = weightedSum / totalWeight;
  }
  return averageTaste;
}

export function detectTasteNeeds(selection: SelectedIngredient[]): TasteNeeds {
  const averageTaste = calculateAverageTaste(selection);
  const counterSweetness = averageTaste.sour + averageTaste.bitter * BITTERNESS_COUNTERWEIGHT;
  return {
    needsBase: !selection.some((item) => item.ingredient.taste.alcohol >= BASE_SPIRIT_ALCOHOL_THRESHOLD),
    needsAcidity: averageTaste.sweet - counterSweetness > IMBALANCE_TOLERANCE,
    needsSweetness: counterSweetness - averageTaste.sweet > IMBALANCE_TOLERANCE,
  };
}

export function scoreBalanceFit(candidate: Ingredient, needs: TasteNeeds): BalanceFit {
  const { taste } = candidate;
  const reasons: string[] = [];
  let score = 0;

  if (needs.needsBase && taste.alcohol >= BASE_SPIRIT_ALCOHOL_THRESHOLD) {
    score += 0.6;
    reasons.push('Daje alkoholnu bazu');
  }
  if (needs.needsAcidity) {
    if (taste.sour >= 5) {
      score += (taste.sour / 10) * 0.6;
      reasons.push('Kiselinom balansira slatkoću');
    } else if (taste.bitter >= 5) {
      score += (taste.bitter / 10) * 0.4;
      reasons.push('Gorčinom balansira slatkoću');
    }
    if (taste.sweet >= 7) {
      score -= 0.3;
    }
  }
  if (needs.needsSweetness) {
    if (taste.sweet >= 5) {
      score += (taste.sweet / 10) * 0.6;
      reasons.push('Slatkoćom zaokružuje kiselost i gorčinu');
    }
    if (taste.sour >= 7) {
      score -= 0.3;
    }
  }

  return { score: Math.max(-0.5, Math.min(1, score)), reasons };
}
