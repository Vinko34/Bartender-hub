import type { CompoundSolubility, HeatStability } from '../types/aroma';

export interface CompoundExtraction {
  solubility: CompoundSolubility;
  heat: HeatStability;
}

/**
 * Rough classification for bar practice, not lab precision.
 * Solubility from approximate logP: water < 1.5 ≤ both ≤ 3 < fat ("fat" also means ethanol extracts it far better than water).
 * Heat: "sensitive" = boils off in an open simmer (bp below ~225 °C) or degrades/transforms when heated.
 */
export const compoundExtractionById: Record<string, CompoundExtraction> = {
  // Monoterpenes – volatile, lipophilic
  limonene: { solubility: 'fat', heat: 'sensitive' },
  'alpha-pinene': { solubility: 'fat', heat: 'sensitive' },
  'beta-pinene': { solubility: 'fat', heat: 'sensitive' },
  myrcene: { solubility: 'fat', heat: 'sensitive' },
  'gamma-terpinene': { solubility: 'fat', heat: 'sensitive' },
  linalool: { solubility: 'both', heat: 'sensitive' },
  geraniol: { solubility: 'fat', heat: 'stable' },
  citronellol: { solubility: 'fat', heat: 'stable' },
  hotrienol: { solubility: 'both', heat: 'sensitive' },
  menthol: { solubility: 'fat', heat: 'sensitive' },
  citral: { solubility: 'fat', heat: 'sensitive' },
  carvone: { solubility: 'both', heat: 'sensitive' },
  camphor: { solubility: 'both', heat: 'sensitive' },
  thujone: { solubility: 'both', heat: 'sensitive' },
  cineole: { solubility: 'both', heat: 'sensitive' },
  'rose-oxide': { solubility: 'fat', heat: 'sensitive' },
  'linalyl-acetate': { solubility: 'fat', heat: 'sensitive' },

  // Sesquiterpenes – heavier, survive heat, need ethanol or fat
  nootkatone: { solubility: 'fat', heat: 'stable' },
  valencene: { solubility: 'fat', heat: 'stable' },
  caryophyllene: { solubility: 'fat', heat: 'stable' },
  rotundone: { solubility: 'fat', heat: 'stable' },
  zingiberene: { solubility: 'fat', heat: 'stable' },

  // Phenols & phenylpropanoids
  thymol: { solubility: 'fat', heat: 'stable' },
  guaiacol: { solubility: 'water', heat: 'stable' },
  vinylguaiacol: { solubility: 'both', heat: 'stable' },
  gingerol: { solubility: 'both', heat: 'sensitive' },
  eugenol: { solubility: 'both', heat: 'stable' },
  anethole: { solubility: 'fat', heat: 'stable' },
  estragole: { solubility: 'fat', heat: 'stable' },

  // Aldehydes
  cinnamaldehyde: { solubility: 'both', heat: 'stable' },
  vanillin: { solubility: 'water', heat: 'stable' },
  benzaldehyde: { solubility: 'both', heat: 'sensitive' },
  decanal: { solubility: 'fat', heat: 'sensitive' },
  nonadienal: { solubility: 'both', heat: 'sensitive' },
  phenylacetaldehyde: { solubility: 'both', heat: 'stable' },

  // Lactones
  'whisky-lactone': { solubility: 'both', heat: 'stable' },
  'gamma-decalactone': { solubility: 'both', heat: 'stable' },
  'delta-decalactone': { solubility: 'both', heat: 'stable' },
  'delta-octalactone': { solubility: 'both', heat: 'stable' },

  // Esters – the "fresh fruit" top notes, first to boil off
  'ethyl-butanoate': { solubility: 'both', heat: 'sensitive' },
  'ethyl-hexanoate': { solubility: 'both', heat: 'sensitive' },
  'isoamyl-acetate': { solubility: 'both', heat: 'sensitive' },
  'hexyl-acetate': { solubility: 'both', heat: 'sensitive' },

  // Sugar-derived & roasted – water-soluble and heat-born
  furaneol: { solubility: 'water', heat: 'stable' },
  sotolon: { solubility: 'water', heat: 'stable' },
  maltol: { solubility: 'water', heat: 'stable' },
  trimethylpyrazine: { solubility: 'water', heat: 'stable' },
  ibmp: { solubility: 'both', heat: 'stable' },
  furfurylthiol: { solubility: 'water', heat: 'sensitive' },
  'mercaptohexyl-acetate': { solubility: 'both', heat: 'sensitive' },
  acetylpyrroline: { solubility: 'water', heat: 'sensitive' },

  // Norisoprenoids & berry ketones
  damascenone: { solubility: 'fat', heat: 'stable' },
  'alpha-ionone': { solubility: 'fat', heat: 'stable' },
  'beta-ionone': { solubility: 'fat', heat: 'stable' },
  'raspberry-ketone': { solubility: 'water', heat: 'stable' },
  'cis-3-hexenol': { solubility: 'both', heat: 'sensitive' },

  // Taste-active
  quinine: { solubility: 'both', heat: 'stable' },
  gentiopicroside: { solubility: 'water', heat: 'stable' },
  capsaicin: { solubility: 'fat', heat: 'stable' },
};
