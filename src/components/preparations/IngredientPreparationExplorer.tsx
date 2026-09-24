import { useMemo, useState } from 'react';
import { useStockContext } from '../../context/StockContext';
import { useAromaticCatalog } from '../../hooks/useCatalog';
import { usePreparationInsight } from '../../hooks/usePreparationInsight';
import type { IngredientCategory } from '../../types/ingredient';
import { IngredientSelect } from '../shared/IngredientSelect';
import { ExtractionProfileBars } from './ExtractionProfileBars';
import { PreparationVerdict } from './PreparationVerdict';

const RAW_CATEGORIES: IngredientCategory[] = ['citrus', 'fruit', 'herb', 'spice'];
const DEFAULT_INGREDIENT_ID = 'strawberry';

export function IngredientPreparationExplorer() {
  const { catalogById } = useStockContext();
  const aromaticCatalog = useAromaticCatalog();
  const rawIngredients = useMemo(
    () => aromaticCatalog.filter((ingredient) => RAW_CATEGORIES.includes(ingredient.category)),
    [aromaticCatalog],
  );
  const [selectedId, setSelectedId] = useState(DEFAULT_INGREDIENT_ID);
  const selectedIngredient = catalogById.get(selectedId);
  const insight = usePreparationInsight(selectedIngredient);

  return (
    <section className="explorer-card">
      <div className="explorer-card__heading">
        <div>
          <h2 className="display-heading">Gdje sastojak najbolje prozire?</h2>
          <p className="muted">Odaberi sastojak – kemijski profil pokazuje koje otapalo nosi njegovu aromu.</p>
        </div>
        <IngredientSelect label="Sastojak" ingredients={rawIngredients} value={selectedId} onChange={setSelectedId} />
      </div>
      {insight && (
        <div className="explorer-card__body">
          <ExtractionProfileBars profile={insight.profile} />
          <PreparationVerdict showcases={insight.showcases} recommendation={insight.recommendation} />
        </div>
      )}
    </section>
  );
}
