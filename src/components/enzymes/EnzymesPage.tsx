import { ENZYME_BASICS, enzymes } from '../../data/enzymes';
import { PageIntro } from '../shared/PageIntro';
import { EnzymeCard } from './EnzymeCard';

export function EnzymesPage() {
  return (
    <main className="article-page">
      <PageIntro
        eyebrow="Znanost okusa"
        title="Enzimi"
        lead="Mali proteinski alati koji režu, spajaju i oksidiraju molekule. Neke dodajemo namjerno (pektinaza, invertaza), a neki već rade u sastojcima – i objašnjavaju zašto krastavac miriše tek kad ga narežeš ili zašto bosiljak pocrni."
      />
      <section className="note-card">
        <h2 className="display-heading">Osnove</h2>
        <ul className="bullet-list">
          {ENZYME_BASICS.map((basic) => (
            <li key={basic}>{basic}</li>
          ))}
        </ul>
      </section>
      <div className="enzyme-grid">
        {enzymes.map((enzyme) => (
          <EnzymeCard key={enzyme.id} enzyme={enzyme} />
        ))}
      </div>
    </main>
  );
}
