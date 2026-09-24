import { PageIntro } from '../shared/PageIntro';
import { CompoundingMethodNote } from './CompoundingMethodNote';
import { CompoundingPrinciples } from './CompoundingPrinciples';
import { PairComparisonPanel } from './PairComparisonPanel';

export function FlavorCompoundingPage() {
  return (
    <main className="article-page">
      <PageIntro
        eyebrow="Znanost okusa"
        title="Flavor compounding"
        lead="Spajanje okusa preko kemijskih spojeva: sastojci koji dijele iste aromatske molekule često se slažu, jer se njihovi mirisi međusobno prepoznaju i nadopunjuju."
      />
      <CompoundingPrinciples />
      <PairComparisonPanel />
      <CompoundingMethodNote />
    </main>
  );
}
