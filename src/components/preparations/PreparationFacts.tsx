import type { Preparation } from '../../types/preparation';

export function PreparationFacts({ preparation }: { preparation: Preparation }) {
  return (
    <dl className="fact-grid">
      <div>
        <dt>Omjer</dt>
        <dd>{preparation.baseRatio}</dd>
      </div>
      <div>
        <dt>Trajnost</dt>
        <dd>{preparation.shelfLife}</dd>
      </div>
      <div>
        <dt>Najbolje za</dt>
        <dd>
          <ul className="plain-list plain-list--positive">
            {preparation.bestFor.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </dd>
      </div>
      <div>
        <dt>Pazi na</dt>
        <dd>
          <ul className="plain-list plain-list--warning">
            {preparation.watchOut.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
