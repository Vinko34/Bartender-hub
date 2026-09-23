import { describe, expect, it } from 'vitest';
import { defaultIngredients } from '../data/defaultIngredients';
import { formatIngredientCount, formatStockQuantity } from './formatting';

describe('formatIngredientCount', () => {
  it.each([
    [1, '1 sastojak'],
    [3, '3 sastojka'],
    [5, '5 sastojaka'],
    [12, '12 sastojaka'],
    [21, '21 sastojak'],
    [22, '22 sastojka'],
  ])('%i → %s', (count, expected) => {
    expect(formatIngredientCount(count)).toBe(expected);
  });
});

describe('formatStockQuantity', () => {
  const gin = defaultIngredients.find((ingredient) => ingredient.id === 'london-dry-gin')!;

  it('shows larger ml amounts in litres with a decimal comma', () => {
    expect(formatStockQuantity({ ...gin, stockQuantity: 300 })).toBe('0,3 L');
  });

  it('keeps small ml amounts in ml', () => {
    expect(formatStockQuantity({ ...gin, stockQuantity: 50 })).toBe('50 ml');
  });
});
