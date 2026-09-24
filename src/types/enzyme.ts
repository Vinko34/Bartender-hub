export interface EnzymeConditions {
  optimum: string;
  dose: string;
  stop: string;
}

export interface EnzymeAromaLink {
  explanation: string;
  compoundIds: string[];
}

export interface Enzyme {
  id: string;
  name: string;
  kind: string;
  summary: string;
  substrate: string;
  products: string;
  sources: string;
  barUses: string[];
  conditions: EnzymeConditions;
  aromaLink?: EnzymeAromaLink;
  cautions: string[];
  naturallyInIngredientIds: string[];
}
