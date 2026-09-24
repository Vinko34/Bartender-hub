import type { BridgeCandidate } from '../../domain/pairComparison';
import { IngredientDot } from '../shared/IngredientDot';

export function BridgeList({ bridges }: { bridges: BridgeCandidate[] }) {
  return (
    <div className="bridges">
      <h3 className="section-label">Mostovi – sastojci koji povezuju oba</h3>
      {bridges.length === 0 ? (
        <p className="muted">Nema sastojka koji je dovoljno blizu obama.</p>
      ) : (
        <ul className="bridge-list">
          {bridges.map((bridge) => (
            <li key={bridge.ingredient.id} className="bridge-chip">
              <IngredientDot category={bridge.ingredient.category} />
              <span>{bridge.ingredient.name}</span>
              <strong>{Math.round(bridge.strength * 100)}%</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
