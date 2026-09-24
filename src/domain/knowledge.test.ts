import { describe, expect, it } from 'vitest';
import { aromaCompounds, aromaCompoundsById } from '../data/aromaCompounds';
import { compoundExtractionById } from '../data/compoundExtraction';
import { defaultIngredients } from '../data/defaultIngredients';
import { enzymes } from '../data/enzymes';
import { preparations } from '../data/preparations';
import type { Ingredient } from '../types/ingredient';
import { calculateExtractionProfile, recommendPreparation } from './extractionProfile';
import { comparePair } from './pairComparison';
import { mergeNewDefaultIngredients } from './stockMigration';

const defaultIds = new Set(defaultIngredients.map((ingredient) => ingredient.id));

function findIngredient(ingredientId: string): Ingredient {
  const ingredient = defaultIngredients.find((candidate) => candidate.id === ingredientId);
  if (!ingredient) throw new Error(`Missing test ingredient ${ingredientId}`);
  return ingredient;
}

describe('knowledge data integrity', () => {
  it('classifies extraction for every aroma compound', () => {
    const unclassified = aromaCompounds.filter((compound) => !compoundExtractionById[compound.id]).map((compound) => compound.id);
    expect(unclassified).toEqual([]);
  });

  it('points preparation showcases at real ingredients and compounds', () => {
    const brokenReferences = preparations.flatMap((preparation) =>
      preparation.showcases.flatMap((showcase) => [
        ...(defaultIds.has(showcase.ingredientId) ? [] : [`${preparation.id} → ${showcase.ingredientId}`]),
        ...showcase.keyCompoundIds
          .filter((compoundId) => !aromaCompoundsById.has(compoundId))
          .map((compoundId) => `${preparation.id} → ${compoundId}`),
      ]),
    );
    expect(brokenReferences).toEqual([]);
  });

  it('points enzymes at real ingredients and compounds', () => {
    const brokenReferences = enzymes.flatMap((enzyme) => [
      ...enzyme.naturallyInIngredientIds.filter((ingredientId) => !defaultIds.has(ingredientId)),
      ...(enzyme.aromaLink?.compoundIds ?? []).filter((compoundId) => !aromaCompoundsById.has(compoundId)),
    ]);
    expect(brokenReferences).toEqual([]);
  });
});

describe('extraction profile', () => {
  it('sees strawberry as water-carried and partly heat-sensitive → cold syrup', () => {
    const strawberry = findIngredient('strawberry');
    const profile = calculateExtractionProfile(strawberry);
    expect(profile.fatShare).toBe(0);
    expect(recommendPreparation(strawberry, profile)?.preparationId).toBe('cold-syrup');
  });

  it('sends capsaicin-heavy jalapeño to an infusion', () => {
    const jalapeno = findIngredient('jalapeno');
    expect(recommendPreparation(jalapeno, calculateExtractionProfile(jalapeno))?.preparationId).toBe('infusion');
  });

  it('sends citrus peel to oleo saccharum and cinnamon to a hot syrup', () => {
    const lemonPeel = findIngredient('lemon-peel');
    const cinnamon = findIngredient('cinnamon');
    expect(recommendPreparation(lemonPeel, calculateExtractionProfile(lemonPeel))?.preparationId).toBe('oleo-saccharum');
    expect(recommendPreparation(cinnamon, calculateExtractionProfile(cinnamon))?.preparationId).toBe('hot-syrup');
  });

  it('does not recommend preparations for finished products', () => {
    const gin = findIngredient('london-dry-gin');
    expect(recommendPreparation(gin, calculateExtractionProfile(gin))).toBeNull();
  });
});

describe('comparePair', () => {
  it('finds linalool shared by gin and lavender, and bridges between them', () => {
    const comparison = comparePair(findIngredient('london-dry-gin'), findIngredient('lavender'), defaultIngredients);
    expect(comparison.sharedCompounds.map((overlap) => overlap.compound.id)).toContain('linalool');
    expect(comparison.bridges.length).toBeGreaterThan(0);
    expect(comparison.bridges.some((bridge) => ['london-dry-gin', 'lavender'].includes(bridge.ingredient.id))).toBe(false);
  });
});

describe('mergeNewDefaultIngredients', () => {
  it('keeps stored quantities and appends only unseen defaults', () => {
    const storedGin = { ...findIngredient('london-dry-gin'), stockQuantity: 5 };
    const merged = mergeNewDefaultIngredients([storedGin], defaultIngredients);
    expect(merged[0]).toBe(storedGin);
    expect(merged.filter((ingredient) => ingredient.id === 'london-dry-gin')).toHaveLength(1);
    expect(merged).toHaveLength(defaultIngredients.length);
  });
});
