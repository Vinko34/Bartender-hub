import { UNTITLED_COCKTAIL_NAME } from '../../data/labels';

interface CocktailHeaderProps {
  name: string;
  hasSelection: boolean;
  onNameChange: (name: string) => void;
  onClear: () => void;
  onBrew: () => void;
  onSave: () => void;
}

export function CocktailHeader({ name, hasSelection, onNameChange, onClear, onBrew, onSave }: CocktailHeaderProps) {
  return (
    <header className="cocktail-header">
      <div className="cocktail-header__title">
        <span className="eyebrow">Koktel u izradi</span>
        <input
          className="cocktail-name"
          value={name}
          placeholder={UNTITLED_COCKTAIL_NAME}
          aria-label="Naziv koktela"
          onChange={(event) => onNameChange(event.target.value)}
        />
      </div>
      <div className="cocktail-header__actions">
        <button type="button" className="text-button" onClick={onClear}>
          Očisti
        </button>
        <button type="button" className="text-button" disabled={!hasSelection} onClick={onBrew}>
          Napravi
        </button>
        <button type="button" className="accent-button" disabled={!hasSelection} onClick={onSave}>
          Spremi recept
        </button>
      </div>
    </header>
  );
}
