import type { Enzyme } from '../../types/enzyme';
import { EnzymeAromaLink } from './EnzymeAromaLink';
import { EnzymeConditionList } from './EnzymeConditionList';
import { EnzymeIngredients } from './EnzymeIngredients';
import { EnzymeReaction } from './EnzymeReaction';

export function EnzymeCard({ enzyme }: { enzyme: Enzyme }) {
  return (
    <article className="enzyme-card">
      <header>
        <span className="eyebrow">{enzyme.kind}</span>
        <h3 className="display-heading">{enzyme.name}</h3>
        <p className="enzyme-card__summary">{enzyme.summary}</p>
      </header>

      <EnzymeReaction substrate={enzyme.substrate} products={enzyme.products} />
      <p className="muted">{enzyme.sources}</p>

      <div>
        <h4 className="section-label">Za šankom</h4>
        <ul className="bullet-list">
          {enzyme.barUses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </div>

      <EnzymeConditionList conditions={enzyme.conditions} />
      {enzyme.aromaLink && <EnzymeAromaLink aromaLink={enzyme.aromaLink} />}

      <ul className="plain-list plain-list--warning">
        {enzyme.cautions.map((caution) => (
          <li key={caution}>{caution}</li>
        ))}
      </ul>

      <EnzymeIngredients ingredientIds={enzyme.naturallyInIngredientIds} />
    </article>
  );
}
