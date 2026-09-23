import { aromaCompoundsById } from '../data/aromaCompounds';
import type { AromaCompound } from '../types/aroma';
import type { SelectedIngredient } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';
import { buildCompoundVector, buildFamilyVector } from './aromaVectors';
import { detectTasteNeeds, scoreBalanceFit, type TasteNeeds } from './tasteBalance';
import { calculateCosineSimilarity } from './vectorMath';

/** Exact shared molecules matter more than merely sharing an aroma family. */
const COMPOUND_SIMILARITY_WEIGHT = 0.7;
const FAMILY_SIMILARITY_WEIGHT = 0.3;
const AROMA_SHARE_OF_SCORE = 0.75;
const BALANCE_SHARE_OF_SCORE = 0.25;
const STRONG_AFFINITY_THRESHOLD = 0.25;
/** Rewards candidates that tie several selected ingredients together. */
const BRIDGE_BONUS_PER_EXTRA_MATCH = 0.08;
const CROWDED_CATEGORY_LIMIT = 2;
const CROWDED_CATEGORY_PENALTY = 0.85;
/** Casks make spirits share many molecules; a second base should rarely outrank a modifier. */
const SECOND_SPIRIT_PENALTY = 0.6;

export interface SharedCompoundMatch {
  compound: AromaCompound;
  candidateIntensity: number;
  sharedWithNames: string[];
}

export interface PairingSuggestion {
  ingredient: Ingredient;
  /** 0–100 */
  score: number;
  aromaScore: number;
  balanceScore: number;
  sharedCompounds: SharedCompoundMatch[];
  reasons: string[];
}

export interface PairingOptions {
  includeOutOfStock: boolean;
  limit: number;
}

interface IngredientAffinity {
  ingredientName: string;
  affinity: number;
}

export function calculateAromaAffinity(firstIngredient: Ingredient, secondIngredient: Ingredient): number {
  const compoundSimilarity = calculateCosineSimilarity(
    buildCompoundVector(firstIngredient),
    buildCompoundVector(secondIngredient),
  );
  const familySimilarity = calculateCosineSimilarity(
    buildFamilyVector(firstIngredient),
    buildFamilyVector(secondIngredient),
  );
  return COMPOUND_SIMILARITY_WEIGHT * compoundSimilarity + FAMILY_SIMILARITY_WEIGHT * familySimilarity;
}

export function findSharedCompounds(candidate: Ingredient, selection: SelectedIngredient[]): SharedCompoundMatch[] {
  const matches: SharedCompoundMatch[] = [];
  for (const presence of candidate.compounds) {
    const compound = aromaCompoundsById.get(presence.compoundId);
    if (!compound) continue;
    const sharedWithNames = selection
      .filter((item) => item.ingredient.compounds.some((selected) => selected.compoundId === presence.compoundId))
      .map((item) => item.ingredient.name);
    if (sharedWithNames.length > 0) {
      matches.push({ compound, candidateIntensity: presence.intensity, sharedWithNames });
    }
  }
  return matches.sort(
    (firstMatch, secondMatch) =>
      secondMatch.sharedWithNames.length - firstMatch.sharedWithNames.length ||
      secondMatch.candidateIntensity - firstMatch.candidateIntensity,
  );
}

function describeAromaReasons(strongAffinities: IngredientAffinity[]): string[] {
  if (strongAffinities.length > 1) {
    return [`Povezuje ${strongAffinities.map((entry) => entry.ingredientName).join(' i ')}`];
  }
  if (strongAffinities.length === 1) {
    return [`Snažan aromatski par s: ${strongAffinities[0]!.ingredientName}`];
  }
  return [];
}

function calculateCrowdingFactor(candidate: Ingredient, sameCategoryCount: number): number {
  if (candidate.category === 'spirit' && sameCategoryCount >= 1) {
    return SECOND_SPIRIT_PENALTY;
  }
  return sameCategoryCount >= CROWDED_CATEGORY_LIMIT ? CROWDED_CATEGORY_PENALTY : 1;
}

function scoreCandidate(candidate: Ingredient, selection: SelectedIngredient[], needs: TasteNeeds): PairingSuggestion {
  const aromaticSelection = selection.filter((item) => item.ingredient.compounds.length > 0);
  const affinities: IngredientAffinity[] = aromaticSelection.map((item) => ({
    ingredientName: item.ingredient.name,
    affinity: calculateAromaAffinity(item.ingredient, candidate),
  }));
  const averageAffinity =
    affinities.length > 0 ? affinities.reduce((sum, entry) => sum + entry.affinity, 0) / affinities.length : 0;
  const strongAffinities = affinities.filter((entry) => entry.affinity >= STRONG_AFFINITY_THRESHOLD);
  const bridgeBonus = Math.max(0, strongAffinities.length - 1) * BRIDGE_BONUS_PER_EXTRA_MATCH;
  const aromaScore = Math.min(1, averageAffinity + bridgeBonus);

  const balanceFit = scoreBalanceFit(candidate, needs);
  const sameCategoryCount = selection.filter((item) => item.ingredient.category === candidate.category).length;
  const crowdingFactor = calculateCrowdingFactor(candidate, sameCategoryCount);
  const rawScore = (AROMA_SHARE_OF_SCORE * aromaScore + BALANCE_SHARE_OF_SCORE * balanceFit.score) * crowdingFactor;

  return {
    ingredient: candidate,
    score: Math.round(Math.max(0, Math.min(1, rawScore)) * 100),
    aromaScore,
    balanceScore: balanceFit.score,
    sharedCompounds: findSharedCompounds(candidate, selection),
    reasons: [...describeAromaReasons(strongAffinities), ...balanceFit.reasons],
  };
}

export function suggestPairings(
  selection: SelectedIngredient[],
  ingredients: Ingredient[],
  options: PairingOptions,
): PairingSuggestion[] {
  if (selection.length === 0) {
    return [];
  }
  const selectedIds = new Set(selection.map((item) => item.ingredient.id));
  const needs = detectTasteNeeds(selection);

  return ingredients
    .filter((candidate) => !selectedIds.has(candidate.id))
    .filter((candidate) => options.includeOutOfStock || candidate.stockQuantity > 0)
    .map((candidate) => scoreCandidate(candidate, selection, needs))
    .filter((suggestion) => suggestion.score > 0)
    .sort((firstSuggestion, secondSuggestion) => secondSuggestion.score - firstSuggestion.score)
    .slice(0, options.limit);
}
