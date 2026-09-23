import { INGREDIENT_CATEGORIES, INGREDIENT_CATEGORY_LABELS, STOCK_UNITS } from '../../data/labels';
import type { UpdateIngredientField } from '../../hooks/useIngredientForm';
import type { Ingredient, IngredientCategory, StockUnit } from '../../types/ingredient';

interface IngredientBasicsFieldsProps {
  draft: Ingredient;
  updateField: UpdateIngredientField;
}

export function IngredientBasicsFields({ draft, updateField }: IngredientBasicsFieldsProps) {
  return (
    <fieldset className="form-grid">
      <label className="form-grid__wide">
        Naziv
        <input
          autoFocus
          required
          value={draft.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
      </label>
      <label>
        Kategorija
        <select
          value={draft.category}
          onChange={(event) => updateField('category', event.target.value as IngredientCategory)}
        >
          {INGREDIENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {INGREDIENT_CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Jedinica
        <select value={draft.unit} onChange={(event) => updateField('unit', event.target.value as StockUnit)}>
          {STOCK_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
      <label>
        Na zalihi
        <input
          type="number"
          min={0}
          value={draft.stockQuantity}
          onChange={(event) => updateField('stockQuantity', Number(event.target.value))}
        />
      </label>
      <label>
        Upozori ispod
        <input
          type="number"
          min={0}
          value={draft.lowStockThreshold}
          onChange={(event) => updateField('lowStockThreshold', Number(event.target.value))}
        />
      </label>
      <label>
        Standardna doza
        <input
          type="number"
          min={0}
          value={draft.defaultServing}
          onChange={(event) => updateField('defaultServing', Number(event.target.value))}
        />
      </label>
    </fieldset>
  );
}
