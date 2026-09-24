import { compoundExtractionById } from '../data/compoundExtraction';
import type { Ingredient, IngredientCategory } from '../types/ingredient';
import type { PreparationId } from '../types/preparation';

/** Finished products (spirits, syrups, mixers) are not raw material for a preparation. */
const RAW_CATEGORIES: IngredientCategory[] = ['citrus', 'fruit', 'herb', 'spice'];
const FAT_DOMINANT_SHARE = 0.5;
const HEAT_SENSITIVE_SHARE = 0.25;

export interface ExtractionProfile {
  /** Shares of total aroma intensity, 0–1. */
  waterShare: number;
  bothShare: number;
  fatShare: number;
  heatSensitiveShare: number;
  totalIntensity: number;
}

export interface PreparationRecommendation {
  preparationId: PreparationId;
  reason: string;
}

export function calculateExtractionProfile(ingredient: Ingredient): ExtractionProfile {
  const totals = { water: 0, both: 0, fat: 0, heatSensitive: 0, all: 0 };
  for (const presence of ingredient.compounds) {
    const extraction = compoundExtractionById[presence.compoundId];
    if (!extraction) continue;
    totals[extraction.solubility] += presence.intensity;
    if (extraction.heat === 'sensitive') totals.heatSensitive += presence.intensity;
    totals.all += presence.intensity;
  }
  const shareOf = (value: number) => (totals.all > 0 ? value / totals.all : 0);
  return {
    waterShare: shareOf(totals.water),
    bothShare: shareOf(totals.both),
    fatShare: shareOf(totals.fat),
    heatSensitiveShare: shareOf(totals.heatSensitive),
    totalIntensity: totals.all,
  };
}

function formatPercent(share: number): string {
  return `${Math.round(share * 100)} %`;
}

/** Rule-of-thumb recommendation derived purely from the compound chemistry. */
export function recommendPreparation(ingredient: Ingredient, profile: ExtractionProfile): PreparationRecommendation | null {
  if (!RAW_CATEGORIES.includes(ingredient.category) || profile.totalIntensity === 0) {
    return null;
  }
  if (profile.fatShare >= FAT_DOMINANT_SHARE) {
    if (ingredient.category === 'citrus' && ingredient.unit === 'kom') {
      return {
        preparationId: 'oleo-saccharum',
        reason: `${formatPercent(profile.fatShare)} arome su uljni spojevi kore – šećer ih izvlači bez vode i topline.`,
      };
    }
    if (ingredient.category === 'citrus') {
      return {
        preparationId: 'cordial',
        reason: 'Kiselina je već u soku – šećer i dodatna kiselina stabiliziraju uljne citrusne note.',
      };
    }
    return {
      preparationId: 'infusion',
      reason: `${formatPercent(profile.fatShare)} arome topljivo je u mastima i alkoholu – etanol ih izvlači, voda ne.`,
    };
  }
  if (profile.heatSensitiveShare >= HEAT_SENSITIVE_SHARE) {
    return {
      preparationId: 'cold-syrup',
      reason: `Aroma je topljiva u vodi, ali ${formatPercent(profile.heatSensitiveShare)} nje hlapi ili se raspada na toplini – bez kuhanja.`,
    };
  }
  return {
    preparationId: 'hot-syrup',
    reason: 'Aroma je topljiva u vodi i stabilna na toplini – kuhanje je izvlači brže i potpunije.',
  };
}
