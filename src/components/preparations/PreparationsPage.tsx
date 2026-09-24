import { PREPARATION_FAMILIES, preparations } from '../../data/preparations';
import { PageIntro } from '../shared/PageIntro';
import { IngredientPreparationExplorer } from './IngredientPreparationExplorer';
import { PreparationCard } from './PreparationCard';

export function PreparationsPage() {
  return (
    <main className="article-page">
      <PageIntro
        eyebrow="Vodič"
        title="Sirupi, cordiali, infuzije"
        lead="Svaka priprema je drugačije otapalo. Voda i šećer nose jedne molekule, alkohol druge, a toplina neke uništi. Zato isti sastojak u jednoj pripremi blista, a u drugoj nestane."
      />
      <IngredientPreparationExplorer />
      {PREPARATION_FAMILIES.map(({ family, label, lead }) => (
        <section key={family} className="article-section">
          <div className="article-section__heading">
            <h2 className="display-heading">{label}</h2>
            <p className="muted">{lead}</p>
          </div>
          <div className="preparation-grid">
            {preparations
              .filter((preparation) => preparation.family === family)
              .map((preparation) => (
                <PreparationCard key={preparation.id} preparation={preparation} />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
