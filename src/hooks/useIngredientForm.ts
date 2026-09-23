import { useCallback, useState } from 'react';
import type { CompoundPresence, Ingredient, TasteDimension } from '../types/ingredient';

export function useIngredientForm(initialIngredient: Ingredient) {
  const [draft, setDraft] = useState<Ingredient>(initialIngredient);

  const updateField = useCallback(
    <Field extends keyof Ingredient>(field: Field, value: Ingredient[Field]) =>
      setDraft((currentDraft) => ({ ...currentDraft, [field]: value })),
    [],
  );

  const updateTaste = useCallback(
    (dimension: TasteDimension, value: number) =>
      setDraft((currentDraft) => ({ ...currentDraft, taste: { ...currentDraft.taste, [dimension]: value } })),
    [],
  );

  const updateCompounds = useCallback(
    (compounds: CompoundPresence[]) => setDraft((currentDraft) => ({ ...currentDraft, compounds })),
    [],
  );

  const isValid = draft.name.trim().length > 0;

  return { draft, updateField, updateTaste, updateCompounds, isValid };
}

export type UpdateIngredientField = ReturnType<typeof useIngredientForm>['updateField'];
