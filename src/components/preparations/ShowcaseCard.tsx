import { useStockContext } from '../../context/StockContext';
import type { PreparationShowcase } from '../../types/preparation';
import { CompoundChipList } from '../shared/CompoundChipList';
import { IngredientDot } from '../shared/IngredientDot';

interface ShowcaseCardProps {
  showcase: PreparationShowcase;
  /** Shown above the headline when the card appears outside its preparation. */
  preparationName?: string;
}

export function ShowcaseCard({ showcase, preparationName }: ShowcaseCardProps) {
  const { catalogById } = useStockContext();
  const ingredient = catalogById.get(showcase.ingredientId);

  return (
    <div className="showcase-card">
      <div className="showcase-card__ingredient">
        {ingredient && <IngredientDot category={ingredient.category} />}
        <span>{preparationName ?? ingredient?.name}</span>
      </div>
      <h5>{showcase.headline}</h5>
      <p>{showcase.explanation}</p>
      <CompoundChipList compoundIds={showcase.keyCompoundIds} />
    </div>
  );
}
