import type { CocktailProfile } from '../../domain/cocktailProfile';
import type { SelectedIngredient } from '../../types/cocktail';
import { AromaProfileCard } from './AromaProfileCard';
import { CocktailHeader } from './CocktailHeader';
import { QuickStart } from './QuickStart';
import { SelectedIngredientPill } from './SelectedIngredientPill';

interface CocktailWorkbenchProps {
  name: string;
  selection: SelectedIngredient[];
  profile: CocktailProfile;
  statusMessage: string | null;
  onNameChange: (name: string) => void;
  onAmountChange: (ingredientId: string, amount: number) => void;
  onRemove: (ingredientId: string) => void;
  onClear: () => void;
  onBrew: () => void;
  onSave: () => void;
  onQuickStart: (ingredientIds: string[]) => void;
}

export function CocktailWorkbench({
  name,
  selection,
  profile,
  statusMessage,
  onNameChange,
  onAmountChange,
  onRemove,
  onClear,
  onBrew,
  onSave,
  onQuickStart,
}: CocktailWorkbenchProps) {
  const hasSelection = selection.length > 0;

  return (
    <section className="workbench">
      <CocktailHeader
        name={name}
        hasSelection={hasSelection}
        onNameChange={onNameChange}
        onClear={onClear}
        onBrew={onBrew}
        onSave={onSave}
      />
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {hasSelection ? (
        <>
          <ul className="pill-list">
            {selection.map((item) => (
              <SelectedIngredientPill
                key={item.ingredient.id}
                item={item}
                onAmountChange={onAmountChange}
                onRemove={onRemove}
              />
            ))}
          </ul>
          <AromaProfileCard profile={profile} />
        </>
      ) : (
        <QuickStart onStart={onQuickStart} />
      )}
    </section>
  );
}
