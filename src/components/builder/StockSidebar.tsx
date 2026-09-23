import { useIngredientFilter } from '../../hooks/useIngredientFilter';
import type { Ingredient } from '../../types/ingredient';
import { CategoryPills } from '../shared/CategoryPills';
import { SearchField } from '../shared/SearchField';
import { StockSidebarItem } from './StockSidebarItem';

interface StockSidebarProps {
  ingredients: Ingredient[];
  selectedIds: Set<string>;
  onToggle: (ingredient: Ingredient) => void;
}

export function StockSidebar({ ingredients, selectedIds, onToggle }: StockSidebarProps) {
  const filter = useIngredientFilter(ingredients);

  return (
    <aside className="stock-sidebar">
      <h2 className="display-heading">Zaliha</h2>
      <SearchField value={filter.query} placeholder="Traži sastojak ili spoj…" onChange={filter.setQuery} />
      <CategoryPills activeGroup={filter.group} onSelect={filter.setGroup} />
      <ul className="stock-sidebar__list">
        {filter.filteredIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            <StockSidebarItem
              ingredient={ingredient}
              isSelected={selectedIds.has(ingredient.id)}
              onToggle={onToggle}
            />
          </li>
        ))}
      </ul>
      {filter.filteredIngredients.length === 0 && <p className="empty-hint">Ništa ne odgovara pretrazi.</p>}
    </aside>
  );
}
