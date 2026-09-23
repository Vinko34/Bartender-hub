import { useMemo, useState } from 'react';
import { aromaCompoundsById } from '../data/aromaCompounds';
import { getCategoryGroup, type CategoryGroup } from '../data/categoryGroups';
import type { Ingredient } from '../types/ingredient';

export type GroupFilter = CategoryGroup | 'all';

function matchesQuery(ingredient: Ingredient, normalizedQuery: string): boolean {
  if (ingredient.name.toLocaleLowerCase('hr').includes(normalizedQuery)) {
    return true;
  }
  return ingredient.compounds.some((presence) =>
    aromaCompoundsById.get(presence.compoundId)?.name.toLocaleLowerCase('hr').includes(normalizedQuery),
  );
}

export function useIngredientFilter(ingredients: Ingredient[]) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<GroupFilter>('all');

  const filteredIngredients = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('hr');
    return ingredients
      .filter((ingredient) => group === 'all' || getCategoryGroup(ingredient.category) === group)
      .filter((ingredient) => matchesQuery(ingredient, normalizedQuery))
      .sort((firstIngredient, secondIngredient) => firstIngredient.name.localeCompare(secondIngredient.name, 'hr'));
  }, [ingredients, query, group]);

  return { query, setQuery, group, setGroup, filteredIngredients };
}

export type IngredientFilterState = ReturnType<typeof useIngredientFilter>;
