import type { AromaCompound } from '../types/aroma';

export const aromaCompounds: AromaCompound[] = [
  // Terpenes – citrus peel, juniper, herbs
  { id: 'limonene', name: 'Limonen', formula: 'C10H16', chemicalClass: 'monoterpene', families: ['citrus'], descriptors: 'svježa narančina i limunova kora' },
  { id: 'alpha-pinene', name: 'α-Pinen', formula: 'C10H16', chemicalClass: 'monoterpene', families: ['woody', 'herbal'], descriptors: 'bor, smola, kleka' },
  { id: 'beta-pinene', name: 'β-Pinen', formula: 'C10H16', chemicalClass: 'monoterpene', families: ['woody', 'green'], descriptors: 'suha šuma, zelene note' },
  { id: 'myrcene', name: 'β-Mircen', formula: 'C10H16', chemicalClass: 'monoterpene', families: ['herbal', 'earthy'], descriptors: 'balzamično, hmelj, mango' },
  { id: 'gamma-terpinene', name: 'γ-Terpinen', formula: 'C10H16', chemicalClass: 'monoterpene', families: ['citrus', 'herbal'], descriptors: 'limeta, zeljasto' },
  { id: 'linalool', name: 'Linalool', formula: 'C10H18O', chemicalClass: 'terpene-alcohol', families: ['floral', 'citrus'], descriptors: 'lavanda, bergamot, korijandar' },
  { id: 'geraniol', name: 'Geraniol', formula: 'C10H18O', chemicalClass: 'terpene-alcohol', families: ['floral'], descriptors: 'ruža, geranij' },
  { id: 'citronellol', name: 'Citronelol', formula: 'C10H20O', chemicalClass: 'terpene-alcohol', families: ['floral', 'citrus'], descriptors: 'ruža, citronela' },
  { id: 'hotrienol', name: 'Hotrienol', formula: 'C10H16O', chemicalClass: 'terpene-alcohol', families: ['floral', 'fruity'], descriptors: 'bazga, cvijet lipe' },
  { id: 'menthol', name: 'Mentol', formula: 'C10H20O', chemicalClass: 'terpene-alcohol', families: ['minty'], descriptors: 'paprena metvica, hladeće' },
  { id: 'citral', name: 'Citral', formula: 'C10H16O', chemicalClass: 'terpene-aldehyde', families: ['citrus'], descriptors: 'limunska trava, limun' },
  { id: 'carvone', name: '(R)-Karvon', formula: 'C10H14O', chemicalClass: 'terpene-ketone', families: ['minty', 'herbal'], descriptors: 'klasasta metvica (spearmint)' },
  { id: 'camphor', name: 'Kamfor', formula: 'C10H16O', chemicalClass: 'terpene-ketone', families: ['herbal', 'woody'], descriptors: 'kamfor, ružmarin' },
  { id: 'thujone', name: 'Tujon', formula: 'C10H16O', chemicalClass: 'terpene-ketone', families: ['herbal', 'bitter'], descriptors: 'pelin, kadulja' },
  { id: 'cineole', name: '1,8-Cineol (eukaliptol)', formula: 'C10H18O', chemicalClass: 'ether', families: ['herbal', 'minty'], descriptors: 'eukaliptus, svježe, kardamom' },
  { id: 'rose-oxide', name: 'Ružin oksid', formula: 'C10H18O', chemicalClass: 'ether', families: ['floral', 'green'], descriptors: 'ruža, liči, bazga' },
  { id: 'linalyl-acetate', name: 'Linalil-acetat', formula: 'C12H20O2', chemicalClass: 'ester', families: ['floral', 'citrus'], descriptors: 'lavanda, bergamot' },

  // Sesquiterpenes
  { id: 'nootkatone', name: 'Nootkaton', formula: 'C15H22O', chemicalClass: 'sesquiterpene', families: ['citrus', 'woody'], descriptors: 'grejp' },
  { id: 'valencene', name: 'Valencen', formula: 'C15H24', chemicalClass: 'sesquiterpene', families: ['citrus', 'woody'], descriptors: 'slatka naranča, drvenasto' },
  { id: 'caryophyllene', name: 'β-Kariofilen', formula: 'C15H24', chemicalClass: 'sesquiterpene', families: ['spicy', 'woody'], descriptors: 'crni papar, klinčić' },
  { id: 'rotundone', name: 'Rotundon', formula: 'C15H22O', chemicalClass: 'sesquiterpene', families: ['spicy'], descriptors: 'papreno, crni papar' },
  { id: 'zingiberene', name: 'Zingiberen', formula: 'C15H24', chemicalClass: 'sesquiterpene', families: ['spicy', 'citrus'], descriptors: 'svježi đumbir' },

  // Phenols & phenylpropanoids – spice, smoke, oak
  { id: 'thymol', name: 'Timol', formula: 'C10H14O', chemicalClass: 'phenol', families: ['herbal', 'spicy'], descriptors: 'majčina dušica' },
  { id: 'guaiacol', name: 'Gvajakol', formula: 'C7H8O2', chemicalClass: 'phenol', families: ['smoky'], descriptors: 'dim, pečeno, treset' },
  { id: 'vinylguaiacol', name: '4-Vinilgvajakol', formula: 'C9H10O2', chemicalClass: 'phenol', families: ['smoky', 'spicy'], descriptors: 'klinčić, dim, pečeno' },
  { id: 'gingerol', name: '6-Gingerol', formula: 'C17H26O4', chemicalClass: 'phenol', families: ['pungent'], descriptors: 'ljutina đumbira' },
  { id: 'eugenol', name: 'Eugenol', formula: 'C10H12O2', chemicalClass: 'phenylpropanoid', families: ['spicy', 'woody'], descriptors: 'klinčić, hrastova bačva' },
  { id: 'anethole', name: 'trans-Anetol', formula: 'C10H12O', chemicalClass: 'phenylpropanoid', families: ['spicy', 'sweet'], descriptors: 'anis, komorač, sladić' },
  { id: 'estragole', name: 'Estragol', formula: 'C10H12O', chemicalClass: 'phenylpropanoid', families: ['herbal', 'spicy'], descriptors: 'estragon, bosiljak' },

  // Aldehydes
  { id: 'cinnamaldehyde', name: 'Cimetaldehid', formula: 'C9H8O', chemicalClass: 'aldehyde', families: ['spicy', 'sweet'], descriptors: 'cimet' },
  { id: 'vanillin', name: 'Vanilin', formula: 'C8H8O3', chemicalClass: 'aldehyde', families: ['sweet', 'woody'], descriptors: 'vanilija, hrastova bačva' },
  { id: 'benzaldehyde', name: 'Benzaldehid', formula: 'C7H6O', chemicalClass: 'aldehyde', families: ['nutty', 'fruity'], descriptors: 'gorki badem, višnjina koštica' },
  { id: 'decanal', name: 'Dekanal', formula: 'C10H20O', chemicalClass: 'aldehyde', families: ['citrus'], descriptors: 'narančina kora, voštano' },
  { id: 'nonadienal', name: '(E,Z)-2,6-Nonadienal', formula: 'C9H14O', chemicalClass: 'aldehyde', families: ['green'], descriptors: 'krastavac, kora lubenice' },
  { id: 'phenylacetaldehyde', name: 'Fenilacetaldehid', formula: 'C8H8O', chemicalClass: 'aldehyde', families: ['floral', 'sweet'], descriptors: 'med, zumbul' },

  // Lactones – coconut, stone fruit, oak
  { id: 'whisky-lactone', name: 'Viski-lakton', formula: 'C9H16O2', chemicalClass: 'lactone', families: ['woody', 'sweet'], descriptors: 'kokos, hrast' },
  { id: 'gamma-decalactone', name: 'γ-Dekalakton', formula: 'C10H18O2', chemicalClass: 'lactone', families: ['fruity', 'sweet'], descriptors: 'breskva, marelica' },
  { id: 'delta-decalactone', name: 'δ-Dekalakton', formula: 'C10H18O2', chemicalClass: 'lactone', families: ['sweet'], descriptors: 'kremasto, mliječno, kokos' },
  { id: 'delta-octalactone', name: 'δ-Oktalakton', formula: 'C8H14O2', chemicalClass: 'lactone', families: ['tropical', 'sweet'], descriptors: 'kokos, kremasto' },

  // Esters – fruit
  { id: 'ethyl-butanoate', name: 'Etil-butanoat', formula: 'C6H12O2', chemicalClass: 'ester', families: ['fruity', 'tropical'], descriptors: 'ananas, tutti-frutti' },
  { id: 'ethyl-hexanoate', name: 'Etil-heksanoat', formula: 'C8H16O2', chemicalClass: 'ester', families: ['fruity'], descriptors: 'zelena jabuka, anis' },
  { id: 'isoamyl-acetate', name: 'Izoamil-acetat', formula: 'C7H14O2', chemicalClass: 'ester', families: ['fruity', 'tropical'], descriptors: 'banana, kruška' },
  { id: 'hexyl-acetate', name: 'Heksil-acetat', formula: 'C8H16O2', chemicalClass: 'ester', families: ['fruity', 'green'], descriptors: 'kruška, jabuka' },

  // Caramel, sugar, maillard
  { id: 'furaneol', name: 'Furaneol', formula: 'C6H8O3', chemicalClass: 'furanone', families: ['sweet', 'fruity'], descriptors: 'jagoda, karamela' },
  { id: 'sotolon', name: 'Sotolon', formula: 'C6H8O3', chemicalClass: 'furanone', families: ['sweet', 'spicy'], descriptors: 'javorov sirup, piskavica' },
  { id: 'maltol', name: 'Maltol', formula: 'C6H6O3', chemicalClass: 'pyranone', families: ['sweet'], descriptors: 'karamela, pečeni šećer' },
  { id: 'trimethylpyrazine', name: '2,3,5-Trimetilpirazin', formula: 'C7H10N2', chemicalClass: 'pyrazine', families: ['nutty', 'earthy'], descriptors: 'kakao, prženi orašasti plodovi' },
  { id: 'ibmp', name: '2-Izobutil-3-metoksipirazin', formula: 'C9H14N2O', chemicalClass: 'pyrazine', families: ['green'], descriptors: 'zelena paprika' },
  { id: 'furfurylthiol', name: '2-Furfuriltiol', formula: 'C5H6OS', chemicalClass: 'thiol', families: ['smoky', 'nutty'], descriptors: 'pržena kava' },
  { id: 'mercaptohexyl-acetate', name: '3-Merkaptoheksil-acetat', formula: 'C8H16O2S', chemicalClass: 'thiol', families: ['tropical', 'fruity'], descriptors: 'marakuja, šimšir' },

  // Norisoprenoids – floral / berry
  { id: 'damascenone', name: 'β-Damascenon', formula: 'C13H18O', chemicalClass: 'norisoprenoid', families: ['fruity', 'floral'], descriptors: 'pečena jabuka, ruža, med' },
  { id: 'alpha-ionone', name: 'α-Ionon', formula: 'C13H20O', chemicalClass: 'norisoprenoid', families: ['floral', 'fruity'], descriptors: 'ljubičica, malina' },
  { id: 'beta-ionone', name: 'β-Ionon', formula: 'C13H20O', chemicalClass: 'norisoprenoid', families: ['floral', 'woody'], descriptors: 'ljubičica, cedar' },
  { id: 'raspberry-ketone', name: 'Malinski keton', formula: 'C10H12O2', chemicalClass: 'ketone', families: ['fruity', 'sweet'], descriptors: 'malina' },
  { id: 'cis-3-hexenol', name: 'cis-3-Heksenol', formula: 'C6H12O', chemicalClass: 'alcohol', families: ['green'], descriptors: 'svježe pokošena trava, list' },

  { id: 'acetylpyrroline', name: '2-Acetil-1-pirolin', formula: 'C6H9NO', chemicalClass: 'heterocycle', families: ['nutty', 'sweet'], descriptors: 'pandan, basmati riža, kokice' },

  // Bitter & pungent (taste-active, not volatile aroma)
  { id: 'quinine', name: 'Kinin', formula: 'C20H24N2O2', chemicalClass: 'alkaloid', families: ['bitter'], descriptors: 'gorko, kora kininovca (tonik)' },
  { id: 'gentiopicroside', name: 'Gencijopikrozid', formula: 'C16H20O9', chemicalClass: 'glycoside', families: ['bitter'], descriptors: 'gorka tvar sirištare (encijan)' },
  { id: 'capsaicin', name: 'Kapsaicin', formula: 'C18H27NO3', chemicalClass: 'alkaloid', families: ['pungent'], descriptors: 'ljutina čilija' },
];

export const aromaCompoundsById = new Map(aromaCompounds.map((compound) => [compound.id, compound]));
