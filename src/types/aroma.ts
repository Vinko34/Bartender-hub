export type AromaFamily =
  | 'citrus'
  | 'floral'
  | 'herbal'
  | 'woody'
  | 'spicy'
  | 'fruity'
  | 'tropical'
  | 'sweet'
  | 'smoky'
  | 'nutty'
  | 'green'
  | 'minty'
  | 'earthy'
  | 'bitter'
  | 'pungent';

export type ChemicalClass =
  | 'monoterpene'
  | 'terpene-alcohol'
  | 'terpene-aldehyde'
  | 'terpene-ketone'
  | 'sesquiterpene'
  | 'ester'
  | 'lactone'
  | 'phenol'
  | 'phenylpropanoid'
  | 'aldehyde'
  | 'ketone'
  | 'alcohol'
  | 'furanone'
  | 'pyranone'
  | 'norisoprenoid'
  | 'thiol'
  | 'pyrazine'
  | 'alkaloid'
  | 'ether'
  | 'glycoside';

export interface AromaCompound {
  id: string;
  name: string;
  formula: string;
  chemicalClass: ChemicalClass;
  families: AromaFamily[];
  descriptors: string;
}
