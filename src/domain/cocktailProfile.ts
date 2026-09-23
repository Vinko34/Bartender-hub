import { aromaCompoundsById } from '../data/aromaCompounds';
import type { AromaCompound } from '../types/aroma';
import type { SelectedIngredient } from '../types/cocktail';
import type { TasteProfile } from '../types/ingredient';
import { calculateAverageTaste, detectTasteNeeds, getTasteWeight, type TasteNeeds } from './tasteBalance';

const MAX_DISPLAYED_COMPOUNDS = 6;

export interface CompoundShare {
  compound: AromaCompound;
  /** Fraction of all aroma intensity in the mix, 0–1. */
  share: number;
}

export interface CocktailProfile {
  taste: TasteProfile;
  compoundShares: CompoundShare[];
  needs: TasteNeeds;
}

function calculateCompoundShares(selection: SelectedIngredient[]): CompoundShare[] {
  const totalByCompoundId = new Map<string, number>();
  for (const item of selection) {
    const weight = getTasteWeight(item);
    for (const presence of item.ingredient.compounds) {
      totalByCompoundId.set(
        presence.compoundId,
        (totalByCompoundId.get(presence.compoundId) ?? 0) + presence.intensity * weight,
      );
    }
  }
  const grandTotal = [...totalByCompoundId.values()].reduce((sum, total) => sum + total, 0);
  if (grandTotal === 0) {
    return [];
  }
  return [...totalByCompoundId.entries()]
    .flatMap(([compoundId, total]) => {
      const compound = aromaCompoundsById.get(compoundId);
      return compound ? [{ compound, share: total / grandTotal }] : [];
    })
    .sort((firstShare, secondShare) => secondShare.share - firstShare.share)
    .slice(0, MAX_DISPLAYED_COMPOUNDS);
}

export function buildCocktailProfile(selection: SelectedIngredient[]): CocktailProfile {
  return {
    taste: calculateAverageTaste(selection),
    compoundShares: calculateCompoundShares(selection),
    needs: detectTasteNeeds(selection),
  };
}
