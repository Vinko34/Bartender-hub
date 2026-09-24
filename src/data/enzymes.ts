import type { Enzyme } from '../types/enzyme';

export const ENZYME_BASICS: string[] = [
  'Enzimi su proteini koji ubrzavaju točno određenu reakciju – pektinaza reže pektin, a šećer ne dira.',
  'Ne troše se: mala doza radi na velikoj količini, ali brzina ovisi o temperaturi, pH-u i vremenu.',
  'Svaki ima optimalnu temperaturu i pH. Iznad određene temperature denaturira i trajno prestaje raditi – tako se enzim namjerno zaustavlja (blanširanje, pasterizacija).',
  'Dozira se po masi sastojka: 0,2 % znači 2 g enzima na 1 kg soka.',
  'Mnogi enzimi već su u sastojcima: proteaze u ananasu i kiviju, lipoksigenaza u krastavcu i bilju, polifenol-oksidaza u bosiljku i jabuci.',
];

export const enzymes: Enzyme[] = [
  {
    id: 'pectinase',
    name: 'Pektinaza',
    kind: 'Hidrolaza – razgrađuje pektin',
    summary: 'Bistri sokove i pirea te povećava prinos soka.',
    substrate: 'Pektin – ljepljivi polisaharid staničnih stijenki voća',
    products: 'Kratki fragmenti galakturonske kiseline: sok gubi viskoznost, a čestice se talože',
    sources:
      'Komercijalno iz plijesni Aspergillus (npr. Pectinex Ultra SP-L); često u mješavini s celulazom za razgradnju cijelih stanica. Prirodno u zrelom voću.',
    barUses: [
      'Klarifikacija soka limete, jabuke i jagode (taloženjem ili centrifugom)',
      'Više soka iz pirea i bobica',
      'Rjeđi pire koji se lakše filtrira',
    ],
    conditions: {
      optimum: 'Radi na sobnoj temperaturi; optimum oko 45–50 °C i pH 3,5–5',
      dose: 'Orijentacijski 0,2 % mase (2 g na 1 kg soka), 15–60 min',
      stop: 'Zagrijavanje iznad ~80 °C nekoliko minuta, ili samo odvajanje taloga',
    },
    aromaLink: {
      explanation:
        'Pektinaza sama ne stvara aromu, ali oslobađa arome zarobljene u pulpi i daje bistar sok u kojem se furaneol i voćni esteri jasnije osjete.',
      compoundIds: ['furaneol', 'ethyl-butanoate'],
    },
    cautions: [
      'Previsoka doza ili predugo djelovanje – sok može postati vodenast',
      'Pripravci se razlikuju po jačini – slijedi uputu proizvođača',
    ],
    naturallyInIngredientIds: [],
  },
  {
    id: 'proteases',
    name: 'Proteaze iz voća',
    kind: 'Hidrolaze – razgrađuju proteine (bromelain, papain, aktinidin, ficin)',
    summary: 'Ananas, papaja, kivi i smokva „jedu” proteine – utječu na želatinu i mliječne tehnike.',
    substrate: 'Proteini – kazein, želatina, bjelančevine',
    products: 'Kraći peptidi i aminokiseline; neki peptidi su gorki',
    sources: 'Bromelain – ananas; papain – papaja; aktinidin – kivi; ficin – smokva',
    barUses: [
      'Zato svježi ananas ili kivi sprječava stvrdnjavanje želatine (jelly shotovi)',
      'U milk washu sa svježim ananasom proteaze mogu razgraditi kazein i otežati stvaranje gruša',
      'Pasterizirani sok nema aktivne proteaze – sigurniji izbor za mliječne tehnike',
    ],
    conditions: {
      optimum: 'Bromelain oko 50–60 °C, aktivan u širokom rasponu pH',
      dose: 'Prirodno prisutne – količina ovisi o zrelosti i svježini voća',
      stop: 'Zagrijavanje (80 °C+ nekoliko minuta); papain je otporniji na toplinu od ostalih',
    },
    cautions: [
      'Svježi ananas + mlijeko ili vrhnje duže vrijeme = gorko i zgrušano',
      'Konzervirani i pasterizirani sokovi ne sadrže aktivne proteaze',
    ],
    naturallyInIngredientIds: ['pineapple-juice'],
  },
  {
    id: 'invertase',
    name: 'Invertaza',
    kind: 'Hidrolaza – cijepa saharozu',
    summary: 'Pretvara običan šećer u invertni: slađe i ne kristalizira.',
    substrate: 'Saharoza (konzumni šećer)',
    products: 'Glukoza + fruktoza (invertni šećer)',
    sources: 'Pčele (zato med sadrži invertni šećer), kvasac, komercijalni pripravci',
    barUses: [
      'Bogati sirupi koji ne kristaliziraju u hladnjaku',
      'Mekši, „medeni” okus i nešto veća slatkoća (fruktoza)',
      'Isti učinak daje kiselina + toplina – malo limunske kiseline i lagano kuhanje',
    ],
    conditions: {
      optimum: 'Oko 50–60 °C, pH oko 4,5',
      dose: 'Prema uputi proizvođača',
      stop: 'Zagrijavanje iznad ~70–80 °C',
    },
    aromaLink: {
      explanation:
        'Invertni šećer je reaktivniji: pri zagrijavanju brže karamelizira i ulazi u Maillardove reakcije, pa nastaje više maltola i furaneola (karamelne note).',
      compoundIds: ['maltol', 'furaneol'],
    },
    cautions: ['Invertni sirup upija vlagu – dobro zatvori bocu', 'Fruktoza je slađa od saharoze – smanji dozu u receptu'],
    naturallyInIngredientIds: ['honey-syrup'],
  },
  {
    id: 'beta-glucosidase',
    name: 'β-Glukozidaza',
    kind: 'Hidrolaza – oslobađa vezane arome',
    summary: 'Budi „skrivenu” aromu: odvaja mirisne molekule od šećera na koji su vezane.',
    substrate: 'Glikozidi – aromatski spoj vezan na glukozu, bez mirisa',
    products: 'Slobodan aromatski spoj (miriše) + glukoza',
    sources: 'Prirodno u voću, cvijeću, čaju i mahunama vanilije; komercijalni „aroma-releasing” enzimi u vinarstvu',
    barUses: [
      'Zato zelena vanilija ne miriše, a kurirana da – β-glukozidaza tijekom kuriranja oslobađa vanilin iz glukovanilina',
      'Linalool i geraniol u grožđu, cvijeću i čaju velikim su dijelom vezani – enzimi, kiselina i vrijeme ih oslobađaju',
      'Eksperimentalno: dodatak u maceracije voća i cvijeća za jači miris',
    ],
    conditions: {
      optimum: 'Ovisi o izvoru; mnogi rade u kiselom (pH 4–5) i blago toplom',
      dose: 'Prema uputi proizvođača',
      stop: 'Zagrijavanje',
    },
    aromaLink: {
      explanation:
        'Izravna veza s aromatskim spojevima: vanilin, linalool, geraniol i prekursori β-damascenona u biljci postoje i kao glikozidi – neaktivan „rezervoar” arome koji enzim otključava.',
      compoundIds: ['vanillin', 'linalool', 'geraniol', 'damascenone'],
    },
    cautions: ['Rezultati jako variraju – testiraj na maloj seriji'],
    naturallyInIngredientIds: ['black-tea'],
  },
  {
    id: 'lipoxygenase',
    name: 'Lipoksigenaza (LOX)',
    kind: 'Oksidoreduktaza – oksidira masne kiseline',
    summary: 'Stvara „zeleni” miris u trenutku kad režeš ili gnječiš bilje i krastavac.',
    substrate: 'Linolna i linolenska kiselina iz staničnih membrana',
    products: 'Hidroperoksidi, koje hidroperoksid-liaza cijepa u C6 i C9 aldehide i alkohole (cis-3-heksenol, nonadienal)',
    sources: 'Prirodno u lišću, krastavcu, rajčici, jabuci',
    barUses: [
      'Zato krastavac i metvica mirišu najjače odmah nakon rezanja ili gnječenja',
      'Pregrubo muljanje stvara previše travnatih i gorkih nota – muljaj nježno',
      'Blanširanje bilja isključuje enzim i čuva boju – za bilje u sirupima i uljima',
    ],
    conditions: {
      optimum: 'Aktivira se odmah pri oštećenju stanica, na sobnoj temperaturi',
      dose: 'Prirodno prisutna',
      stop: 'Blanširanje – kratko u kipuću vodu, zatim u ledenu',
    },
    aromaLink: {
      explanation:
        'Izravno stvara aromatske spojeve iz ove aplikacije: cis-3-heksenol (pokošena trava) i (E,Z)-2,6-nonadienal (krastavac). U netaknutom listu gotovo ih nema – nastaju u sekundama nakon rezanja.',
      compoundIds: ['cis-3-hexenol', 'nonadienal'],
    },
    cautions: ['Aroma nastaje brzo i brzo blijedi – reži neposredno prije upotrebe'],
    naturallyInIngredientIds: ['cucumber', 'mint', 'basil'],
  },
  {
    id: 'polyphenol-oxidase',
    name: 'Polifenol-oksidaza (PPO)',
    kind: 'Oksidoreduktaza – posmeđivanje',
    summary: 'Zašto bosiljak pocrni, a jabuka i banana posmeđe.',
    substrate: 'Polifenoli + kisik',
    products: 'Kinoni, koji se spajaju u smeđe pigmente; svježina se gubi',
    sources: 'Jabuka, kruška, banana, avokado, bosiljak, metvica',
    barUses: [
      'Smeđi svježi sok jabuke i pocrnjeli bosiljak u sirupu',
      'Askorbinska kiselina (vitamin C) i kiselina iz citrusa usporavaju posmeđivanje',
      'Blanširanje bilja prije sirupa ili ulja čuva zelenu boju',
    ],
    conditions: {
      optimum: 'pH oko 5–7, sobna temperatura; slabi ispod pH ~3',
      dose: 'Prirodno prisutna',
      stop: 'Kiselina (askorbinska orijentacijski ~1 g/L), hladnoća, blanširanje, manje kisika',
    },
    aromaLink: {
      explanation:
        'Oksidacija ne mijenja samo boju: kinoni reagiraju s drugim spojevima, pa svježe note (esteri, zeleni spojevi) blijede, a javljaju se „oksidirane” note.',
      compoundIds: ['hexyl-acetate', 'cis-3-hexenol'],
    },
    cautions: ['Usitnjavanje i muljanje bilja ubrzava posmeđivanje – pripremaj što bliže servisu'],
    naturallyInIngredientIds: ['basil', 'mint'],
  },
  {
    id: 'amylase',
    name: 'Amilaza',
    kind: 'Hidrolaza – razgrađuje škrob',
    summary: 'Pretvara škrob u šećere – rjeđi i slađi sirupi od riže, zobi ili žitarica.',
    substrate: 'Škrob (riža, zob, kukuruz)',
    products: 'Maltoza, glukoza i dekstrini',
    sources: 'Slad (proklijale žitarice), koji (Aspergillus oryzae), komercijalni pripravci',
    barUses: [
      'Sirupi i „mlijeka” od riže i zobi (horchata, rižin sirup) bez ljepljive, škrobne teksture',
      'Osnova proizvodnje sakea, piva i žitnih destilata',
      'Tostirana riža ili zob + amilaza = orašasti, karamelni sirup',
    ],
    conditions: {
      optimum: 'Oko 60–70 °C (kao u pivarstvu), pH oko 5–6',
      dose: 'Prema uputi proizvođača, ili slad kao prirodni izvor',
      stop: 'Kuhanje iznad ~80 °C',
    },
    aromaLink: {
      explanation:
        'Kuhana i tostirana riža nosi 2-acetil-1-pirolin – isti spoj kao pandan – te pirazine. Zato rižin sirup i pandan prirodno idu zajedno.',
      compoundIds: ['acetylpyrroline', 'trimethylpyrazine'],
    },
    cautions: ['Ako se ne zagrije nakon tretmana, enzim nastavlja raditi – sirup postaje sve slađi i rjeđi'],
    naturallyInIngredientIds: [],
  },
];
