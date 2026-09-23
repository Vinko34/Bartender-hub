import type { IngredientFilterState } from '../../hooks/useIngredientFilter';
import { CategoryPills } from './CategoryPills';
import { SearchField } from './SearchField';

export function IngredientFilterBar({ filter }: { filter: IngredientFilterState }) {
  return (
    <div className="filter-bar">
      <SearchField value={filter.query} placeholder="Traži sastojak ili spoj…" onChange={filter.setQuery} />
      <CategoryPills activeGroup={filter.group} onSelect={filter.setGroup} />
    </div>
  );
}
