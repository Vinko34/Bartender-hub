import type { Preparation, PreparationFamily } from '../types/preparation';

export const PREPARATION_FAMILIES: { family: PreparationFamily; label: string; lead: string }[] = [
  { family: 'syrup', label: 'Sirupi', lead: 'Voda i šećer kao otapalo – s toplinom ili bez nje.' },
  { family: 'cordial', label: 'Cordiali', lead: 'Šećer + kiselina: svježina, ravnoteža i dulji vijek.' },
  { family: 'infusion', label: 'Infuzije', lead: 'Alkohol izvlači ono što voda ne može.' },
  { family: 'clarification', label: 'Klarifikacija', lead: 'Proteini mlijeka odnose oštrinu, boju i mutnoću.' },
];

export const preparations: Preparation[] = [
  {
    id: 'hot-syrup',
    family: 'syrup',
    name: 'Sirup – vrući postupak',
    tagline: 'Voda + šećer + toplina: izvlači ono što je topljivo u vodi i ne boji se vatre.',
    definition:
      'Otopina šećera u vodi (najčešće 1:1 ili 2:1 težinski) u kojoj se sastojak kuha ili namače dok je vruće. Toplina razbija stanične stijenke i ubrzava otapanje, ali istovremeno tjera hlapljive spojeve u zrak.',
    mechanism: [
      'Voda je polarno otapalo: dobro otapa šećere, kiseline i male polarne molekule poput vanilina, maltola i furaneola.',
      'Toplina ubrzava difuziju i omekšava tvrde matrice – kore, korijenje i sjemenke – zato su začini idealni za vrući postupak.',
      'Spojevi niskog vrelišta (esteri, monoterpeni, „zeleni” C6 spojevi) isparavaju s parom: svježe voćne note nestaju, „kuhane” ostaju.',
      'Dulje kuhanje pokreće karamelizaciju i Maillardove reakcije – nastaju maltol, furaneol i sotolon (karamela, tost).',
    ],
    baseRatio: '1:1 (lagani) ili 2:1 (bogati) šećer : voda, težinski',
    steps: [
      'Otopi šećer u vodi uz lagano zagrijavanje.',
      'Dodaj sastojak i drži ispod vrenja 10–20 min (začini i korijenje mogu dulje).',
      'Makni s vatre, poklopi i ostavi da se ohladi – poklopac vraća dio hlapljivih spojeva.',
      'Procijedi u sterilnu bocu i čuvaj u hladnjaku.',
    ],
    shelfLife: '1:1 približno 2–4 tjedna, 2:1 dulje; s voćem i biljem kraće – uvijek u hladnjaku.',
    bestFor: ['Začini, kore drveća, korijenje, sjemenke', 'Spojevi stabilni na toplini: cimetaldehid, eugenol, vanilin'],
    watchOut: ['Svježi voćni esteri isparavaju', 'Citrusne i zelene note (monoterpeni) se gube'],
    showcases: [
      {
        ingredientId: 'cinnamon',
        headline: 'Cimet se otvara tek u vrućem sirupu',
        explanation:
          'Cimetaldehid i eugenol zaključani su u tvrdoj, drvenastoj kori. Toplina omekšava koru i ubrzava otapanje, a oba spoja imaju visoko vrelište (oko 250 °C) pa ne isparavaju tijekom kuhanja. Hladni postupak trajao bi danima i dao bljeđi rezultat.',
        keyCompoundIds: ['cinnamaldehyde', 'eugenol'],
      },
      {
        ingredientId: 'fresh-ginger',
        headline: 'Đumbir u vrućem sirupu postaje topliji i ljući',
        explanation:
          'Kuhanjem se dio gingerola pretvara u shogaol, koji je oštriji i „topliji” – zato vrući đumbirov sirup ima puniju ljutinu od sirovog soka. Citral i dio svježih, limunskih nota pritom ispari; za svjež đumbir koristi sok iz sokovnika + šećer bez kuhanja.',
        keyCompoundIds: ['gingerol', 'zingiberene', 'citral'],
      },
    ],
  },
  {
    id: 'cold-syrup',
    family: 'syrup',
    name: 'Sirup – hladni postupak',
    tagline: 'Šećer izvlači sok osmozom, bez vrenja – čuva svježe, hlapljive note.',
    definition:
      'Sastojak se zasipa šećerom (maceracija) ili namače u sirupu na sobnoj temperaturi, u hladnjaku ili ispod ~60 °C. Šećer osmozom izvlači staničnu vodu i s njom otopljene arome – bez kuhanja.',
    mechanism: [
      'Osmoza: visoka koncentracija šećera izvan stanice izvlači vodu iz nje – sok izlazi sam, noseći aromu otopljenu u sebi.',
      'Bez vrenja nema isparavanja: esteri (etil-butanoat), zeleni aldehidi i tioli ostaju u sirupu.',
      'Nema Maillardovih reakcija – okus ostaje „svjež”, a ne „džem”.',
      'Slabost: slabije izvlači spojeve topljive u mastima, a rok trajanja je kraći jer ništa nije pasterizirano.',
    ],
    baseRatio: 'Voće : šećer oko 1:1 težinski, ili sastojak potopljen u gotov sirup 1:1',
    steps: [
      'Nareži voće, zaspi šećerom i promiješaj.',
      'Ostavi pokriveno 4–24 h (dulje u hladnjaku), povremeno promiješaj.',
      'Kad se šećer otopi u izvučenom soku, procijedi bez gnječenja.',
      'Po želji dodaj malo limunske kiseline za svježinu; čuvaj u hladnjaku.',
    ],
    shelfLife: 'Oko 1–2 tjedna u hladnjaku.',
    bestFor: ['Mekano voće, bobice, krastavac, nježno bilje', 'Hlapljivi esteri i zeleni aldehidi'],
    watchOut: ['Terpeni iz kore ostaju u kori', 'Tvrdi začini – presporo'],
    showcases: [
      {
        ingredientId: 'strawberry',
        headline: 'Jagoda najbolje prozire kroz sirup',
        explanation:
          'Ključni spoj jagode, furaneol, izrazito je topljiv u vodi – šećer i voda ga savršeno nose, alkohol mu ne treba. Furaneol ima i slatku, karamelnu notu pa se sa šećerom međusobno pojačavaju: mozak povezuje miris jagode sa slatkoćom, pa se sirup doživljava i slađim i „jagodastijim”. Svježinu daju esteri poput etil-butanoata – oni isparavaju pri kuhanju. Zato hladna maceracija daje jagodu, a kuhanje džem.',
        keyCompoundIds: ['furaneol', 'ethyl-butanoate', 'gamma-decalactone'],
      },
      {
        ingredientId: 'cucumber',
        headline: 'Krastavac mora ostati hladan',
        explanation:
          'Miris krastavca uglavnom je (E,Z)-2,6-nonadienal, koji nastaje enzimski tek kad se krastavac nareže (lipoksigenaza – vidi Enzime). Taj aldehid je hlapljiv i osjetljiv na toplinu: kuhani krastavac gubi miris i dobiva notu kuhanog povrća. Hladni sok + šećer ili kratka maceracija čuvaju svježinu.',
        keyCompoundIds: ['nonadienal', 'cis-3-hexenol'],
      },
    ],
  },
  {
    id: 'cordial',
    family: 'cordial',
    name: 'Cordial',
    tagline: 'Sirup + kiselina (+ aroma): uravnotežen, stabilan i odmah spreman za koktel.',
    definition:
      'Zaslađen i zakiseljen pripravak – šećer, kiselina (limunska, jabučna, vinska ili sok citrusa) i aroma. Kiselina daje svježinu i ravnotežu te snižava pH, što usporava kvarenje. Često zamjenjuje svježi sok koji se brzo mijenja.',
    mechanism: [
      'Kiselina uravnotežuje slatkoću – cordial je „sour” komponenta u jednoj boci.',
      'Nizak pH usporava mikroorganizme i posmeđivanje (polifenol-oksidaza slabo radi u jako kiselom).',
      'Kombinacija kiselina mijenja karakter: limunska je oštra i kratka, jabučna zelena i duža, vinska tvrda i „grožđana”.',
      'Pazi: citral, ključ limete i limuna, u kiselom se s vremenom razgrađuje – cordial od limete najbolji je unutar nekoliko dana.',
    ],
    baseRatio: 'Sirup 1:1 + kiselina oko 2–5 % mase (ili dio vode zamijeni sokom citrusa) – podešava se okusom',
    steps: [
      'Pripremi aromatsku bazu – oleo saccharum od kore, namočeno cvijeće ili sok.',
      'Otopi šećer u vodi/soku i dodaj kiselinu postupno, kušajući.',
      'Cvijeće i kore namači hladno 24–48 h.',
      'Procijedi, ohladi i čuvaj u hladnjaku.',
    ],
    shelfLife: 'Nekoliko tjedana u hladnjaku – kiselina i šećer konzerviraju.',
    bestFor: ['Citrusi, cvijeće (bazga), bobičasto voće', 'Svježe, kisele i cvjetne note'],
    watchOut: ['Citral s vremenom nestaje u kiselom', 'Nema dubine karamelnih nota'],
    showcases: [
      {
        ingredientId: 'lime-juice',
        headline: 'Limeta kao cordial – svježina koja traje',
        explanation:
          'Svježi sok limete mijenja se već unutar nekoliko sati. Cordial spaja sok, šećer i dodatnu kiselinu pa je okus stabilniji i ujednačeniji iz dana u dan. Limonen i γ-terpinen iz kore daju punoću; citral je najosjetljiviji i u kiselom polako nestaje – zato se cordial od limete radi u manjim serijama.',
        keyCompoundIds: ['citral', 'limonene', 'gamma-terpinene'],
      },
      {
        ingredientId: 'elderflower',
        headline: 'Bazga traži kiselinu, ne vatru',
        explanation:
          'Miris bazge nose hotrienol, ružin oksid i linalool – hlapljivi terpeni koji brzo nestaju pri kuhanju. Zato se cvat namače hladno 24–48 h u sirupu s limunskom kiselinom: kiselina čuva miris, snižava pH (cvijeće inače brzo fermentira i posmeđi) i daje svježinu koja podiže cvjetne note.',
        keyCompoundIds: ['hotrienol', 'rose-oxide', 'linalool'],
      },
    ],
  },
  {
    id: 'oleo-saccharum',
    family: 'cordial',
    name: 'Oleo saccharum',
    tagline: 'Šećer umjesto otapala: izvlači eterična ulja iz kore bez vode i topline.',
    definition:
      'Kora citrusa (bez bijelog dijela) zasipa se šećerom i ostavi nekoliko sati. Šećer izvlači ulje i vlagu iz uljnih žlijezda kore pa nastaje gust, mirisan „uljni sirup” – klasična baza za punch i cordiale.',
    mechanism: [
      'Eterično ulje kore gotovo je čisti limonen s drugim terpenima – netopljivo u vodi, ali ga šećer izvlači iz žlijezda i veže u gustu smjesu.',
      'Bez vode i topline ništa ne ispari – dobivaš najsvježiju moguću citrusnu notu.',
      'Bijeli dio kore (albedo) je gorak zbog flavonoida – guli tanko.',
    ],
    baseRatio: 'Kora : šećer oko 1:1 težinski',
    steps: [
      'Tanko oguli koru bez bijelog dijela.',
      'Promiješaj sa šećerom i lagano izgnječi.',
      'Ostavi pokriveno 2–12 h na sobnoj temperaturi.',
      'Otopi s malo soka ili vode i procijedi koru.',
    ],
    shelfLife: 'Najbolje odmah; otopljeno u hladnjaku nekoliko dana.',
    bestFor: ['Kore limuna, naranče i grejpa', 'Terpeni topljivi u mastima: limonen, citral, dekanal'],
    watchOut: ['Sam je „ravan” – treba mu kiselina (sok) za ravnotežu', 'Bijeli dio kore daje gorčinu'],
    showcases: [
      {
        ingredientId: 'lemon-peel',
        headline: 'Kora limuna daje najviše kroz oleo saccharum',
        explanation:
          'Gotovo sva aroma kore su limonen i citral – spojevi topljivi u uljima, a ne u vodi. U vodenom sirupu ostali bi zarobljeni u kori, a kuhanjem bi isparili. Šećer ih izvlači „na suho”, bez topline, pa oleo miriše kao tek naribana kora.',
        keyCompoundIds: ['limonene', 'citral', 'beta-pinene'],
      },
      {
        ingredientId: 'orange-peel',
        headline: 'Naranča: dekanal i valencen za „sočnu” koru',
        explanation:
          'Uz limonen, kora naranče ima dekanal (voštana nota narančine kore) i valencen – teže, manje hlapljive molekule koje daju dubinu. Oleo saccharum ih izvlači zajedno s limonenom, a spojen sa sokom i kiselinom postaje baza cordiala.',
        keyCompoundIds: ['decanal', 'valencene', 'limonene'],
      },
    ],
  },
  {
    id: 'infusion',
    family: 'infusion',
    name: 'Infuzija',
    tagline: 'Alkohol kao otapalo: izvlači i ono što voda ne može.',
    definition:
      'Sastojak se namače u žestici ili likeru od nekoliko minuta do nekoliko dana, zatim se procijedi. Etanol otapa i polarne i nepolarne spojeve, pa izvlači terpene, fenole i kapsaicin koje voda ostavlja u sastojku.',
    mechanism: [
      'Etanol otapa spojeve topljive u mastima – terpene, seskviterpene, kapsaicin, ionone – ključ za začine, lišće i ljute papričice.',
      'Jača žestica (50 %+) brže izvlači uljne spojeve; slabija više vodotopivih tvari i tanina.',
      'Vrijeme je glavni alat: arome izlaze prve, a gorčina, tanini i klorofil kasnije – infuzija se kuša i prekida na vrijeme.',
      'Blaga toplina (sous-vide ~50–60 °C) ili pritisak (sifon s N₂O) ubrzavaju proces bez kuhanja.',
    ],
    baseRatio:
      'Orijentacijski na 700 ml: 1 ljuta papričica (minute do sati), 5–20 g lišća (sati), 10–30 g začina (1–3 dana)',
    steps: [
      'Stavi sastojak u žesticu u čistoj staklenci.',
      'Kušaj redovito – ljuto svakih 15–30 min, bilje svakih nekoliko sati.',
      'Kad je aroma na vrhuncu, odmah procijedi.',
      'Po potrebi filtriraj ili klarificiraj (npr. milk wash).',
    ],
    shelfLife: 'Mjesecima – alkohol konzervira (ako nema svježeg voća u boci).',
    bestFor: ['Začini, bilje, ljute papričice, čaj, pandan', 'Spojevi topljivi u mastima i alkoholu'],
    watchOut: ['Preduga infuzija izvlači gorčinu, tanine i klorofil'],
    showcases: [
      {
        ingredientId: 'jalapeno',
        headline: 'Jalapeño u tequili radi za minute',
        explanation:
          'Kapsaicin je gotovo netopljiv u vodi, ali se odlično otapa u etanolu – zato ljuti sirup slabo hvata ljutinu, a tequila za 15–60 min postane ljuta. 2-izobutil-3-metoksipirazin daje zelenu, paprikastu notu i vrlo je jak, pa infuziju treba kušati često i prekinuti rano.',
        keyCompoundIds: ['capsaicin', 'ibmp'],
      },
      {
        ingredientId: 'black-pepper',
        headline: 'Crni papar treba alkohol',
        explanation:
          'Rotundon (papreni miris) i β-kariofilen teški su seskviterpeni topljivi u mastima – u vodu gotovo ne izlaze. Infuzija zdrobljenog papra u žestici izvlači ih neusporedivo bolje od sirupa.',
        keyCompoundIds: ['rotundone', 'caryophyllene'],
      },
      {
        ingredientId: 'pandan',
        headline: 'Pandan: infuzija je prvi korak',
        explanation:
          '2-acetil-1-pirolin (slatka nota basmati riže i kokica) topljiv je i u vodi – zato postoji i pandan sirup. Ali list je čvrst i voštan, a etanol prodire kroz voštanu površinu i izvlači aromu brže i potpunije, zajedno sa zelenim notama lista. Ali izvuče i klorofil, gorke polifenole i travnatu oštrinu – zato pandan prirodno ide u drugi korak: milk wash.',
        keyCompoundIds: ['acetylpyrroline', 'cis-3-hexenol'],
      },
    ],
  },
  {
    id: 'milk-wash',
    family: 'clarification',
    name: 'Milk wash (mliječna klarifikacija)',
    tagline: 'Mlijeko + kiselina: proteini hvataju oštrinu i boju, ostaje bistro i svilenkasto.',
    definition:
      'Koktel ili infuzija s kiselinom spoji se s mlijekom. Kiselina zgrušava kazein, a nastali gruš kao filter zarobljava polifenole, tanine, boju i čestice. Nakon filtracije ostaje bistra tekućina – mekša, s blagom kremastom teksturom. Tehnika je stara stoljećima (milk punch).',
    mechanism: [
      'Kazein se zgrušava pri pH oko 4,6 – kiselina iz citrusa u tekućini pokreće stvaranje gruša.',
      'Kazein veže polifenole i tanine – odlaze gorčina i trpkost, isto kao kad se mlijeko ulije u čaj.',
      'Gruš zarobljava klorofil i sitne čestice pa tekućina postaje bistra; filtriranje kroz sam gruš najbolji je filter.',
      'Ostaju laktoza i dio proteina sirutke: svilenkast, zaobljen osjećaj u ustima i stabilnost na polici.',
    ],
    baseRatio: 'Oko 4:1 do 5:1 tekućina : punomasno mlijeko; tekućina mora sadržavati kiselinu',
    steps: [
      'Pripremi tekućinu s kiselinom (koktel ili infuzija + citrus).',
      'Najčešće se tekućina ulijeva u mlijeko; promiješaj jednom, lagano.',
      'Ostavi 30 min do nekoliko sati da se gruš slegne (hladnjak).',
      'Filtriraj kroz kavni filter; prve mutne kapi vrati natrag dok ne poteče bistro.',
    ],
    shelfLife: 'Tjednima do mjesecima u hladnjaku – bistro i stabilno.',
    bestFor: ['Taninske i travnate infuzije (čaj, pandan), oštri koktelski mixevi', 'Uklanja tanine, polifenole, klorofil i mutnoću'],
    watchOut: ['Gubi se dio boje i arome vezane uz proteine', 'Kazein veže i kapsaicin – ljutina se smanjuje'],
    showcases: [
      {
        ingredientId: 'pandan',
        headline: 'Zašto pandan super prozire kroz infuziju + milk wash',
        explanation:
          'Infuzija izvuče sve: slatki 2-acetil-1-pirolin, ali i klorofil, polifenole i travnate note. Milk wash tada radi selektivno – kazein veže polifenole i hvata klorofil, pa odlaze gorčina, trpkost i zelena boja. Mala, hlapljiva molekula 2-AP slabije se veže za proteine i većim dijelom prolazi, a sirutka i mliječni laktoni dodaju kremastu mekoću koja je pandanu prirodno srodna (zato se u Aziji pandan spaja s kokosovim mlijekom). Rezultat: bistar, mekan, čist pandan bez travnatosti.',
        keyCompoundIds: ['acetylpyrroline', 'delta-decalactone', 'cis-3-hexenol'],
      },
      {
        ingredientId: 'black-tea',
        headline: 'Čaj: milk wash skida trpkost',
        explanation:
          'Infuzija crnog čaja daje linalool, geraniol, β-damascenon i β-ionon (cvjetno-voćne note), ali i puno tanina koji suše usta. Kazein veže tanine kao kad se mlijeko ulije u čaj – nakon klarifikacije ostaje mirisan čaj bez trpkosti, pa se može infundirati jače i dulje.',
        keyCompoundIds: ['linalool', 'damascenone', 'beta-ionone'],
      },
    ],
  },
];

export const preparationsById = new Map(preparations.map((preparation) => [preparation.id, preparation]));
