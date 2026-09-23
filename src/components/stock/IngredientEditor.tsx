import type { FormEvent } from 'react';
import { useIngredientForm } from '../../hooks/useIngredientForm';
import type { Ingredient } from '../../types/ingredient';
import { CompoundEditor } from './CompoundEditor';
import { IngredientBasicsFields } from './IngredientBasicsFields';
import { TasteEditor } from './TasteEditor';

interface IngredientEditorProps {
  initialIngredient: Ingredient;
  isNew: boolean;
  onSave: (ingredient: Ingredient) => void;
  onCancel: () => void;
}

export function IngredientEditor({ initialIngredient, isNew, onSave, onCancel }: IngredientEditorProps) {
  const { draft, updateField, updateTaste, updateCompounds, isValid } = useIngredientForm(initialIngredient);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValid) {
      onSave({ ...draft, name: draft.name.trim() });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{isNew ? 'Nova komponenta' : `Uredi: ${initialIngredient.name}`}</h2>
        <IngredientBasicsFields draft={draft} updateField={updateField} />
        <TasteEditor taste={draft.taste} onChange={updateTaste} />
        <CompoundEditor compounds={draft.compounds} onChange={updateCompounds} />
        <footer className="modal__footer">
          <button type="button" className="button button--ghost" onClick={onCancel}>
            Odustani
          </button>
          <button type="submit" className="button button--primary" disabled={!isValid}>
            Spremi
          </button>
        </footer>
      </form>
    </div>
  );
}
