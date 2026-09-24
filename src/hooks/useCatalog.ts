import { useMemo } from 'react';
import { useStockContext } from '../context/StockContext';
import type { Ingredient } from '../types/ingredient';

/** Every known ingredient (stock + default catalogue) that carries aroma data, sorted by name. */
export function useAromaticCatalog(): Ingredient[] {
  const { catalogById } = useStockContext();
  return useMemo(
    () =>
      [...catalogById.values()]
        .filter((ingredient) => ingredient.compounds.length > 0)
        .sort((firstIngredient, secondIngredient) => firstIngredient.name.localeCompare(secondIngredient.name, 'hr')),
    [catalogById],
  );
}
