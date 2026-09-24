const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: 'Aromatski otisak',
    body: 'Svaki sastojak ima svoj popis molekula i njihov intenzitet. Gin je α-pinen, limonen i linalool; jagoda furaneol i esteri.',
  },
  {
    title: 'Zajednička molekula',
    body: 'Kad dva sastojka dijele molekulu – gin i lavanda dijele linalool – doživljavamo ih kao srodne. Spoj je harmoničan, a zajednička nota se pojačava.',
  },
  {
    title: 'Most',
    body: 'Treći sastojak koji dijeli spojeve s oba može povezati dva udaljena sastojka. Tako bosiljak veže gin i jagodu preko linaloola.',
  },
  {
    title: 'Kontrast je dopušten',
    body: 'Istraživanja recepata (Ahn i sur., 2011.) pokazuju da zapadne kuhinje češće spajaju sastojke sa zajedničkim spojevima, a istočnoazijske češće one bez njih. Dijeljenje spojeva je alat, ne zakon.',
  },
  {
    title: 'Okus nije samo miris',
    body: 'Slatko, kiselo, gorko i alkohol moraju biti u ravnoteži. Savršen aromatski par i dalje treba kiselinu ili šećer da postane koktel.',
  },
];

export function CompoundingPrinciples() {
  return (
    <section className="principle-grid">
      {PRINCIPLES.map((principle, principleIndex) => (
        <article key={principle.title} className="principle-card">
          <span className="principle-card__number">{principleIndex + 1}</span>
          <h3>{principle.title}</h3>
          <p>{principle.body}</p>
        </article>
      ))}
    </section>
  );
}
