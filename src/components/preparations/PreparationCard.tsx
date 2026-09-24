import type { Preparation } from '../../types/preparation';
import { PreparationFacts } from './PreparationFacts';
import { ShowcaseCard } from './ShowcaseCard';

export function PreparationCard({ preparation }: { preparation: Preparation }) {
  return (
    <article className="preparation-card" id={`priprema-${preparation.id}`}>
      <header className="preparation-card__header">
        <h3 className="display-heading">{preparation.name}</h3>
        <p className="preparation-card__tagline">{preparation.tagline}</p>
      </header>
      <p>{preparation.definition}</p>

      <div>
        <h4 className="section-label">Kako radi</h4>
        <ul className="bullet-list">
          {preparation.mechanism.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <PreparationFacts preparation={preparation} />

      <details className="steps">
        <summary>Postupak</summary>
        <ol>
          {preparation.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>

      <div className="showcase-list">
        <h4 className="section-label">Što ovdje najbolje prozire</h4>
        {preparation.showcases.map((showcase) => (
          <ShowcaseCard key={showcase.ingredientId} showcase={showcase} />
        ))}
      </div>
    </article>
  );
}
