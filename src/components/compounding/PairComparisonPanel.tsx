import { useState } from 'react';
import { useStockContext } from '../../context/StockContext';
import { useAromaticCatalog } from '../../hooks/useCatalog';
import { usePairComparison } from '../../hooks/usePairComparison';
import { IngredientSelect } from '../shared/IngredientSelect';
import { BridgeList } from './BridgeList';
import { SharedCompoundTable } from './SharedCompoundTable';
import { UniqueCompoundColumns } from './UniqueCompoundColumns';

export function PairComparisonPanel() {
  const { catalogById } = useStockContext();
  const aromaticCatalog = useAromaticCatalog();
  const [firstId, setFirstId] = useState('london-dry-gin');
  const [secondId, setSecondId] = useState('lavender');
  const firstIngredient = catalogById.get(firstId);
  const secondIngredient = catalogById.get(secondId);
  const comparison = usePairComparison(firstIngredient, secondIngredient, aromaticCatalog);

  return (
    <section className="explorer-card">
      <div className="explorer-card__heading">
        <div>
          <h2 className="display-heading">Usporedi dva sastojka</h2>
          <p className="muted">Koje molekule dijele, po čemu se razlikuju i što ih može povezati.</p>
        </div>
        <div className="pair-selects">
          <IngredientSelect label="Prvi" ingredients={aromaticCatalog} value={firstId} onChange={setFirstId} />
          <span className="pair-selects__plus" aria-hidden="true">+</span>
          <IngredientSelect label="Drugi" ingredients={aromaticCatalog} value={secondId} onChange={setSecondId} />
        </div>
      </div>
      {!comparison && <p className="empty-hint">Odaberi dva različita sastojka.</p>}
      {comparison && firstIngredient && secondIngredient && (
        <div className="comparison">
          <div className="comparison__score">
            <span className="comparison__percent">{Math.round(comparison.affinity * 100)}%</span>
            <span className="muted">aromatska sličnost</span>
          </div>
          <SharedCompoundTable
            overlaps={comparison.sharedCompounds}
            firstName={firstIngredient.name}
            secondName={secondIngredient.name}
          />
          <UniqueCompoundColumns
            firstName={firstIngredient.name}
            secondName={secondIngredient.name}
            onlyInFirst={comparison.onlyInFirst}
            onlyInSecond={comparison.onlyInSecond}
          />
          <BridgeList bridges={comparison.bridges} />
        </div>
      )}
    </section>
  );
}
