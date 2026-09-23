import { CATEGORY_GROUPS, CATEGORY_GROUP_STYLES } from '../../data/categoryGroups';
import type { GroupFilter } from '../../hooks/useIngredientFilter';

const PILL_OPTIONS: { value: GroupFilter; label: string }[] = [
  { value: 'all', label: 'Sve' },
  ...CATEGORY_GROUPS.map((group) => ({ value: group, label: CATEGORY_GROUP_STYLES[group].label })),
];

interface CategoryPillsProps {
  activeGroup: GroupFilter;
  onSelect: (group: GroupFilter) => void;
}

export function CategoryPills({ activeGroup, onSelect }: CategoryPillsProps) {
  return (
    <div className="category-pills" role="group" aria-label="Kategorije">
      {PILL_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === activeGroup ? 'category-pill category-pill--active' : 'category-pill'}
          aria-pressed={option.value === activeGroup}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
