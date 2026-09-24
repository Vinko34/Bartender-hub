import { CATEGORY_GROUPS, CATEGORY_GROUP_STYLES, getCategoryGroup } from '../../data/categoryGroups';
import type { Ingredient } from '../../types/ingredient';

interface IngredientSelectProps {
  label: string;
  ingredients: Ingredient[];
  value: string;
  onChange: (ingredientId: string) => void;
}

export function IngredientSelect({ label, ingredients, value, onChange }: IngredientSelectProps) {
  return (
    <label className="ingredient-select">
      <span className="ingredient-select__label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {CATEGORY_GROUPS.map((group) => {
          const groupIngredients = ingredients.filter((ingredient) => getCategoryGroup(ingredient.category) === group);
          if (groupIngredients.length === 0) return null;
          return (
            <optgroup key={group} label={CATEGORY_GROUP_STYLES[group].label}>
              {groupIngredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </label>
  );
}
