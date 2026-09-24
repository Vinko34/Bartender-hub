import { preparationsById } from '../../data/preparations';
import type { PreparationRecommendation } from '../../domain/extractionProfile';
import type { ShowcaseInPreparation } from '../../domain/preparationLookup';
import { ShowcaseCard } from './ShowcaseCard';

interface PreparationVerdictProps {
  showcases: ShowcaseInPreparation[];
  recommendation: PreparationRecommendation | null;
}

export function PreparationVerdict({ showcases, recommendation }: PreparationVerdictProps) {
  if (showcases.length > 0) {
    return (
      <div className="verdict">
        <h3 className="section-label">Preporuka</h3>
        {showcases.map(({ preparation, showcase }) => (
          <ShowcaseCard key={preparation.id} showcase={showcase} preparationName={preparation.name} />
        ))}
      </div>
    );
  }
  if (!recommendation) {
    return <p className="empty-hint">Za ovaj sastojak još nema zabilježenih aromatskih spojeva.</p>;
  }
  return (
    <div className="verdict">
      <h3 className="section-label">Kemijski gledano</h3>
      <div className="showcase-card">
        <h5>{preparationsById.get(recommendation.preparationId)?.name}</h5>
        <p>{recommendation.reason}</p>
        {/* A button, not an anchor: the hash is reserved for page routing. */}
        <button
          type="button"
          className="text-link"
          onClick={() =>
            document
              .getElementById(`priprema-${recommendation.preparationId}`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        >
          Pogledaj pripremu ↓
        </button>
      </div>
    </div>
  );
}
