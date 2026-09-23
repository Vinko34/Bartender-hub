import type { CocktailProfile } from '../../domain/cocktailProfile';
import { CompoundShareRow } from './CompoundShareRow';
import { TasteBalance } from './TasteBalance';

export function AromaProfileCard({ profile }: { profile: CocktailProfile }) {
  const largestShare = profile.compoundShares[0]?.share ?? 0;

  return (
    <section className="aroma-card">
      <div className="aroma-card__heading">
        <h3 className="display-heading">Aromatski profil</h3>
        <span className="muted">udio spoja u mješavini</span>
      </div>
      {profile.compoundShares.length === 0 ? (
        <p className="empty-hint">Odabrani sastojci nemaju zabilježene aromatske spojeve.</p>
      ) : (
        <ul className="share-list">
          {profile.compoundShares.map((compoundShare) => (
            <CompoundShareRow
              key={compoundShare.compound.id}
              compoundShare={compoundShare}
              largestShare={largestShare}
            />
          ))}
        </ul>
      )}
      <TasteBalance taste={profile.taste} needs={profile.needs} />
    </section>
  );
}
