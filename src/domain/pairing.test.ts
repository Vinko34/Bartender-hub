import { describe, expect, it } from 'vitest';
import { aromaCompoundsById } from '../data/aromaCompounds';
import { defaultIngredients } from '../data/defaultIngredients';
import type { SelectedIngredient } from '../types/cocktail';
import type { Ingredient } from '../types/ingredient';
import { calculateAromaAffinity, suggestPairings } from './pairing';
import { detectTasteNeeds } from './tasteBalance';

function findIngredient(ingredientId: string): Ingredient {
  const ingredient = defaultIngredients.find((candidate) => candidate.id === ingredientId);
  if (!ingredient) throw new Error(`Missing test ingredient ${ingredientId}`);
  return ingredient;
}

function select(ingredientId: string, amount?: number): SelectedIngredient {
  const ingredient = findIngredient(ingredientId);
  return { ingredient, amount: amount ?? ingredient.defaultServing };
}

const ALL_IN_STOCK = { includeOutOfStock: true, limit: 100 };

describe('default data', () => {
  it('references only known aroma compounds', () => {
    const unknownReferences = defaultIngredients.flatMap((ingredient) =>
      ingredient.compounds
        .filter((presence) => !aromaCompoundsById.has(presence.compoundId))
        .map((presence) => `${ingredient.id} → ${presence.compoundId}`),
    );
    expect(unknownReferences).toEqual([]);
  });

  it('has unique ingredient ids', () => {
    const ids = defaultIngredients.map((ingredient) => ingredient.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('calculateAromaAffinity', () => {
  it('pairs gin more closely with lavender (linalool) than with coffee liqueur', () => {
    const gin = findIngredient('london-dry-gin');
    expect(calculateAromaAffinity(gin, findIngredient('lavender'))).toBeGreaterThan(
      calculateAromaAffinity(gin, findIngredient('coffee-liqueur')),
    );
  });

  it('is zero for ingredients without compounds', () => {
    expect(calculateAromaAffinity(findIngredient('vodka'), findIngredient('lemon-juice'))).toBe(0);
  });
});

describe('suggestPairings', () => {
  it('returns nothing for an empty selection', () => {
    expect(suggestPairings([], defaultIngredients, ALL_IN_STOCK)).toEqual([]);
  });

  it('never suggests an already selected ingredient', () => {
    const suggestions = suggestPairings([select('bourbon')], defaultIngredients, ALL_IN_STOCK);
    expect(suggestions.some((suggestion) => suggestion.ingredient.id === 'bourbon')).toBe(false);
  });

  it('ranks oak-sharing ingredients high for bourbon', () => {
    const suggestions = suggestPairings([select('bourbon')], defaultIngredients, ALL_IN_STOCK);
    const topIds = suggestions.slice(0, 8).map((suggestion) => suggestion.ingredient.id);
    expect(topIds).toContain('maple-syrup');
  });

  it('reports the shared molecule behind a match', () => {
    const [lavenderSuggestion] = suggestPairings([select('london-dry-gin')], [findIngredient('lavender')], ALL_IN_STOCK);
    const sharedIds = lavenderSuggestion?.sharedCompounds.map((match) => match.compound.id);
    expect(sharedIds).toContain('linalool');
  });

  it('hides out-of-stock ingredients unless asked', () => {
    const outOfStockIds = defaultIngredients.filter((ingredient) => ingredient.stockQuantity === 0).map((ingredient) => ingredient.id);
    const suggestions = suggestPairings([select('london-dry-gin')], defaultIngredients, { includeOutOfStock: false, limit: 100 });
    expect(suggestions.some((suggestion) => outOfStockIds.includes(suggestion.ingredient.id))).toBe(false);
  });

  it('pushes acidity when the drink is too sweet', () => {
    const sweetSelection = [select('white-rum', 50), select('simple-syrup', 40)];
    const suggestions = suggestPairings(sweetSelection, defaultIngredients, ALL_IN_STOCK);
    const limeRank = suggestions.findIndex((suggestion) => suggestion.ingredient.id === 'lime-juice');
    const grenadineRank = suggestions.findIndex((suggestion) => suggestion.ingredient.id === 'grenadine');
    expect(limeRank).toBeGreaterThanOrEqual(0);
    expect(grenadineRank === -1 || limeRank < grenadineRank).toBe(true);
  });
});

describe('detectTasteNeeds', () => {
  it('asks for a base spirit and sweetness when only citrus is selected', () => {
    expect(detectTasteNeeds([select('lime-juice')])).toEqual({
      needsBase: true,
      needsAcidity: false,
      needsSweetness: true,
    });
  });

  it('considers a classic daiquiri ratio balanced', () => {
    const daiquiri = [select('white-rum', 60), select('lime-juice', 25), select('simple-syrup', 20)];
    expect(detectTasteNeeds(daiquiri)).toEqual({ needsBase: false, needsAcidity: false, needsSweetness: false });
  });
});
