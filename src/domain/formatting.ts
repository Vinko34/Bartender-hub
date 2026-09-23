import type { Ingredient, StockUnit } from '../types/ingredient';

/** The low-stock threshold sits at a quarter of what counts as a full shelf. */
const FULL_STOCK_MULTIPLIER = 4;
const LITRE_DISPLAY_FROM_ML = 100;

export type StockStatus = 'empty' | 'low' | 'ok';

function formatDecimal(value: number, maximumFractionDigits: number): string {
  return value.toLocaleString('hr-HR', { maximumFractionDigits });
}

export function formatAmount(amount: number, unit: StockUnit): string {
  return `${formatDecimal(amount, 1)} ${unit}`;
}

export function formatStockQuantity(ingredient: Ingredient): string {
  if (ingredient.unit === 'ml' && ingredient.stockQuantity >= LITRE_DISPLAY_FROM_ML) {
    return `${formatDecimal(ingredient.stockQuantity / 1000, 2)} L`;
  }
  return formatAmount(ingredient.stockQuantity, ingredient.unit);
}

export function getStockStatus(ingredient: Ingredient): StockStatus {
  if (ingredient.stockQuantity <= 0) return 'empty';
  if (ingredient.stockQuantity <= ingredient.lowStockThreshold) return 'low';
  return 'ok';
}

export function calculateStockFill(ingredient: Ingredient): number {
  const fullLevel = ingredient.lowStockThreshold * FULL_STOCK_MULTIPLIER;
  if (fullLevel <= 0) {
    return ingredient.stockQuantity > 0 ? 1 : 0;
  }
  return Math.min(1, ingredient.stockQuantity / fullLevel);
}

/** Croatian plural: 1 sastojak, 2–4 sastojka, 5+ sastojaka (11–14 always "sastojaka"). */
export function formatIngredientCount(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const isTeen = lastTwoDigits >= 11 && lastTwoDigits <= 14;
  let noun = 'sastojaka';
  if (!isTeen && lastDigit === 1) noun = 'sastojak';
  else if (!isTeen && lastDigit >= 2 && lastDigit <= 4) noun = 'sastojka';
  return `${count} ${noun}`;
}
