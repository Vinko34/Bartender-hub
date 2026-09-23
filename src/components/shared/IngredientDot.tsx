import { CATEGORY_GROUP_STYLES, getCategoryGroup } from '../../data/categoryGroups';
import type { IngredientCategory } from '../../types/ingredient';

interface IngredientDotProps {
  category: IngredientCategory;
  size?: 'small' | 'large';
}

export function IngredientDot({ category, size = 'small' }: IngredientDotProps) {
  return (
    <span
      className={`ingredient-dot ingredient-dot--${size}`}
      style={{ background: CATEGORY_GROUP_STYLES[getCategoryGroup(category)].color }}
      aria-hidden="true"
    />
  );
}
