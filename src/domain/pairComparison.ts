import { aromaCompoundsById } from '../data/aromaCompounds';
import type { AromaCompound } from '../types/aroma';
import type { Ingredient } from '../types/ingredient';
import { calculateAromaAffinity } from './pairing';

const DEFAULT_BRIDGE_LIMIT = 5;
const MINIMUM_BRIDGE_STRENGTH = 0.1;

export interface CompoundOverlap {
  compound: AromaCompound;
  firstIntensity: number;
  secondIntensity: number;
}

export interface CompoundOnlyIn {
  compound: AromaCompound;
  intensity: number;
}

export interface BridgeCandidate {
  ingredient: Ingredient;
  /** The weaker of the two affinities – a bridge is only as strong as its weakest side. */
  strength: number;
}

export interface PairComparison {
  affinity: number;
  sharedCompounds: CompoundOverlap[];
  onlyInFirst: CompoundOnlyIn[];
  onlyInSecond: CompoundOnlyIn[];
  bridges: BridgeCandidate[];
}

function listUniqueCompounds(ingredient: Ingredient, excludedIds: Set<string>): CompoundOnlyIn[] {
  return ingredient.compounds
    .filter((presence) => !excludedIds.has(presence.compoundId))
    .flatMap((presence) => {
      const compound = aromaCompoundsById.get(presence.compoundId);
      return compound ? [{ compound, intensity: presence.intensity }] : [];
    })
    .sort((firstEntry, secondEntry) => secondEntry.intensity - firstEntry.intensity);
}

export function findBridges(
  firstIngredient: Ingredient,
  secondIngredient: Ingredient,
  candidates: Ingredient[],
  limit = DEFAULT_BRIDGE_LIMIT,
): BridgeCandidate[] {
  return candidates
    .filter((candidate) => candidate.id !== firstIngredient.id && candidate.id !== secondIngredient.id)
    .map((candidate) => ({
      ingredient: candidate,
      strength: Math.min(
        calculateAromaAffinity(firstIngredient, candidate),
        calculateAromaAffinity(secondIngredient, candidate),
      ),
    }))
    .filter((bridge) => bridge.strength >= MINIMUM_BRIDGE_STRENGTH)
    .sort((firstBridge, secondBridge) => secondBridge.strength - firstBridge.strength)
    .slice(0, limit);
}

export function comparePair(
  firstIngredient: Ingredient,
  secondIngredient: Ingredient,
  bridgeCandidates: Ingredient[],
): PairComparison {
  const secondIntensityById = new Map(
    secondIngredient.compounds.map((presence) => [presence.compoundId, presence.intensity]),
  );
  const sharedCompounds = firstIngredient.compounds
    .flatMap((presence) => {
      const compound = aromaCompoundsById.get(presence.compoundId);
      const secondIntensity = secondIntensityById.get(presence.compoundId);
      return compound && secondIntensity
        ? [{ compound, firstIntensity: presence.intensity, secondIntensity }]
        : [];
    })
    .sort(
      (firstOverlap, secondOverlap) =>
        Math.min(secondOverlap.firstIntensity, secondOverlap.secondIntensity) -
        Math.min(firstOverlap.firstIntensity, firstOverlap.secondIntensity),
    );
  const sharedIds = new Set(sharedCompounds.map((overlap) => overlap.compound.id));

  return {
    affinity: calculateAromaAffinity(firstIngredient, secondIngredient),
    sharedCompounds,
    onlyInFirst: listUniqueCompounds(firstIngredient, sharedIds),
    onlyInSecond: listUniqueCompounds(secondIngredient, sharedIds),
    bridges: findBridges(firstIngredient, secondIngredient, bridgeCandidates),
  };
}
