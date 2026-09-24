import type { Ingredient, IngredientCategory, StockUnit } from '../types/ingredient';

type TasteScores = [sweet: number, sour: number, bitter: number, alcohol: number];

interface IngredientOverrides {
  defaultServing?: number;
  lowStockThreshold?: number;
}

const DEFAULT_SERVING_BY_CATEGORY: Record<IngredientCategory, number> = {
  spirit: 50,
  liqueur: 20,
  fortified: 30,
  citrus: 25,
  fruit: 30,
  herb: 8,
  spice: 1,
  sweetener: 15,
  bitters: 2,
  mixer: 100,
  other: 25,
};

const LOW_STOCK_THRESHOLD_BY_UNIT: Record<StockUnit, number> = {
  ml: 300,
  g: 50,
  kom: 10,
};

function defineIngredient(
  id: string,
  name: string,
  category: IngredientCategory,
  unit: StockUnit,
  stockQuantity: number,
  [sweet, sour, bitter, alcohol]: TasteScores,
  compoundIntensities: Record<string, number>,
  overrides: IngredientOverrides = {},
): Ingredient {
  return {
    id,
    name,
    category,
    unit,
    stockQuantity,
    lowStockThreshold: overrides.lowStockThreshold ?? LOW_STOCK_THRESHOLD_BY_UNIT[unit],
    defaultServing: overrides.defaultServing ?? DEFAULT_SERVING_BY_CATEGORY[category],
    taste: { sweet, sour, bitter, alcohol },
    compounds: Object.entries(compoundIntensities).map(([compoundId, intensity]) => ({ compoundId, intensity })),
  };
}

export const defaultIngredients: Ingredient[] = [
  // Spirits
  defineIngredient('london-dry-gin', 'London Dry Gin', 'spirit', 'ml', 2100, [1, 0, 1, 9], { 'alpha-pinene': 5, myrcene: 3, limonene: 3, linalool: 3, 'beta-pinene': 2, caryophyllene: 1 }),
  defineIngredient('vodka', 'Votka', 'spirit', 'ml', 1400, [0, 0, 0, 9], {}),
  defineIngredient('white-rum', 'Bijeli rum', 'spirit', 'ml', 1400, [1, 0, 0, 9], { 'ethyl-butanoate': 2, 'isoamyl-acetate': 2, 'ethyl-hexanoate': 1 }),
  defineIngredient('aged-rum', 'Odležani rum', 'spirit', 'ml', 700, [2, 0, 1, 9], { vanillin: 3, 'whisky-lactone': 2, 'ethyl-butanoate': 2, damascenone: 2, eugenol: 1, maltol: 1 }),
  defineIngredient('bourbon', 'Bourbon', 'spirit', 'ml', 1400, [2, 0, 1, 9], { vanillin: 4, 'whisky-lactone': 4, eugenol: 2, damascenone: 2, maltol: 2, 'ethyl-hexanoate': 1 }),
  defineIngredient('islay-scotch', 'Islay Scotch (tresetni)', 'spirit', 'ml', 350, [0, 0, 2, 9], { guaiacol: 5, vinylguaiacol: 2, vanillin: 2, 'whisky-lactone': 1 }),
  defineIngredient('tequila-blanco', 'Tequila Blanco', 'spirit', 'ml', 1400, [1, 0, 0, 9], { linalool: 2, damascenone: 2, 'ethyl-hexanoate': 2, 'cis-3-hexenol': 1 }),
  defineIngredient('mezcal', 'Mezcal', 'spirit', 'ml', 700, [1, 0, 1, 9], { guaiacol: 4, vinylguaiacol: 2, linalool: 1, damascenone: 1 }),
  defineIngredient('cognac', 'Konjak VSOP', 'spirit', 'ml', 700, [2, 0, 1, 9], { vanillin: 3, damascenone: 3, 'whisky-lactone': 2, 'ethyl-hexanoate': 2, eugenol: 1 }),

  // Liqueurs
  defineIngredient('triple-sec', 'Triple Sec (naranča)', 'liqueur', 'ml', 700, [8, 0, 1, 5], { limonene: 5, decanal: 3, linalool: 2, valencene: 2 }),
  defineIngredient('aperol', 'Aperol', 'liqueur', 'ml', 1000, [7, 1, 4, 2], { limonene: 3, valencene: 2, gentiopicroside: 2, vanillin: 1 }),
  defineIngredient('campari', 'Campari', 'liqueur', 'ml', 1000, [6, 0, 8, 3], { gentiopicroside: 5, limonene: 3, eugenol: 1 }),
  defineIngredient('elderflower-liqueur', 'Liker od bazge', 'liqueur', 'ml', 700, [8, 1, 0, 3], { hotrienol: 4, 'rose-oxide': 3, linalool: 3, damascenone: 1 }),
  defineIngredient('maraschino', 'Maraschino', 'liqueur', 'ml', 700, [7, 0, 1, 4], { benzaldehyde: 5, vanillin: 1 }),
  defineIngredient('amaretto', 'Amaretto', 'liqueur', 'ml', 700, [8, 0, 1, 4], { benzaldehyde: 5, vanillin: 3 }),
  defineIngredient('coffee-liqueur', 'Liker od kave', 'liqueur', 'ml', 700, [9, 0, 3, 3], { furfurylthiol: 4, guaiacol: 2, vanillin: 2, trimethylpyrazine: 2, maltol: 2 }),
  defineIngredient('cacao-liqueur', 'Crème de Cacao', 'liqueur', 'ml', 500, [9, 0, 2, 3], { trimethylpyrazine: 3, vanillin: 3, phenylacetaldehyde: 2 }),
  defineIngredient('green-chartreuse', 'Zeleni Chartreuse', 'liqueur', 'ml', 350, [6, 0, 4, 8], { cineole: 3, menthol: 2, thujone: 2, 'alpha-pinene': 2, linalool: 2, anethole: 1 }),
  defineIngredient('absinthe', 'Absint', 'liqueur', 'ml', 500, [1, 0, 4, 10], { anethole: 5, thujone: 3, estragole: 1, cineole: 1 }, { defaultServing: 5 }),
  defineIngredient('creme-de-violette', 'Crème de Violette', 'liqueur', 'ml', 0, [8, 0, 0, 3], { 'alpha-ionone': 4, 'beta-ionone': 4 }, { defaultServing: 10 }),
  defineIngredient('banana-liqueur', 'Liker od banane', 'liqueur', 'ml', 500, [9, 0, 0, 3], { 'isoamyl-acetate': 5 }),

  // Fortified wines
  defineIngredient('sweet-vermouth', 'Crveni vermut', 'fortified', 'ml', 1000, [6, 1, 3, 3], { vanillin: 2, thujone: 2, eugenol: 2, damascenone: 2, cinnamaldehyde: 1, linalool: 1 }),
  defineIngredient('dry-vermouth', 'Suhi vermut', 'fortified', 'ml', 750, [2, 2, 3, 3], { thujone: 2, linalool: 2, citral: 1, cineole: 1 }),

  // Citrus
  defineIngredient('lemon-juice', 'Sok limuna', 'citrus', 'ml', 800, [1, 9, 1, 0], { limonene: 3, citral: 3, 'gamma-terpinene': 1, 'beta-pinene': 1 }),
  defineIngredient('lime-juice', 'Sok limete', 'citrus', 'ml', 800, [1, 10, 1, 0], { limonene: 3, citral: 3, 'gamma-terpinene': 3, 'beta-pinene': 2 }),
  defineIngredient('orange-juice', 'Sok naranče', 'citrus', 'ml', 1000, [5, 4, 0, 0], { limonene: 3, valencene: 2, decanal: 2, linalool: 2, 'ethyl-butanoate': 1 }, { defaultServing: 60 }),
  defineIngredient('grapefruit-juice', 'Sok grejpa', 'citrus', 'ml', 500, [3, 6, 3, 0], { nootkatone: 4, limonene: 3, 'ethyl-butanoate': 1 }, { defaultServing: 60 }),
  defineIngredient('lemon-peel', 'Kora limuna', 'citrus', 'kom', 20, [0, 0, 2, 0], { limonene: 5, citral: 3, 'beta-pinene': 2, 'gamma-terpinene': 2, geraniol: 1 }, { defaultServing: 1, lowStockThreshold: 5 }),
  defineIngredient('orange-peel', 'Kora naranče', 'citrus', 'kom', 15, [0, 0, 2, 0], { limonene: 5, decanal: 3, linalool: 2, valencene: 2, citral: 1 }, { defaultServing: 1, lowStockThreshold: 5 }),

  // Fruit
  defineIngredient('pineapple-juice', 'Sok ananasa', 'fruit', 'ml', 1000, [6, 4, 0, 0], { 'ethyl-butanoate': 4, furaneol: 3, 'delta-octalactone': 1 }, { defaultServing: 60 }),
  defineIngredient('apple-juice', 'Sok jabuke', 'fruit', 'ml', 1000, [6, 3, 0, 0], { 'hexyl-acetate': 3, damascenone: 2, 'ethyl-butanoate': 1 }, { defaultServing: 60 }),
  defineIngredient('passion-fruit-puree', 'Pire marakuje', 'fruit', 'ml', 150, [6, 7, 0, 0], { 'mercaptohexyl-acetate': 5, 'ethyl-butanoate': 3, 'beta-ionone': 1 }, { defaultServing: 20 }),
  defineIngredient('peach-puree', 'Pire breskve', 'fruit', 'ml', 500, [6, 2, 0, 0], { 'gamma-decalactone': 5, linalool: 2, benzaldehyde: 1 }),
  defineIngredient('coconut-cream', 'Kokosova krema', 'fruit', 'ml', 400, [6, 0, 0, 0], { 'delta-octalactone': 5 }),
  defineIngredient('strawberry', 'Jagoda', 'fruit', 'kom', 40, [5, 3, 0, 0], { furaneol: 5, 'ethyl-butanoate': 2, 'gamma-decalactone': 2, linalool: 1 }, { defaultServing: 3 }),
  defineIngredient('raspberry', 'Malina', 'fruit', 'kom', 60, [4, 4, 0, 0], { 'raspberry-ketone': 4, 'alpha-ionone': 3, 'beta-ionone': 2, 'cis-3-hexenol': 1 }, { defaultServing: 6 }),
  defineIngredient('cucumber', 'Krastavac (kolutovi)', 'fruit', 'kom', 30, [0, 0, 1, 0], { nonadienal: 5, 'cis-3-hexenol': 3 }, { defaultServing: 3 }),

  // Herbs (kom = leaves / sprigs)
  defineIngredient('mint', 'Metvica (listići)', 'herb', 'kom', 120, [0, 0, 0, 0], { carvone: 5, limonene: 2, 'cis-3-hexenol': 2, cineole: 1, menthol: 1 }),
  defineIngredient('basil', 'Bosiljak (listići)', 'herb', 'kom', 60, [0, 0, 0, 0], { linalool: 4, estragole: 3, eugenol: 2, cineole: 2 }, { defaultServing: 6 }),
  defineIngredient('rosemary', 'Ružmarin (grančica)', 'herb', 'kom', 15, [0, 0, 1, 0], { cineole: 4, 'alpha-pinene': 3, camphor: 3 }, { defaultServing: 1, lowStockThreshold: 3 }),
  defineIngredient('thyme', 'Majčina dušica (grančica)', 'herb', 'kom', 12, [0, 0, 1, 0], { thymol: 5, 'gamma-terpinene': 2, linalool: 1 }, { defaultServing: 1, lowStockThreshold: 3 }),
  defineIngredient('sage', 'Kadulja (listići)', 'herb', 'kom', 20, [0, 0, 1, 0], { thujone: 3, cineole: 3, camphor: 2 }, { defaultServing: 3 }),
  defineIngredient('pandan', 'Pandan (list)', 'herb', 'kom', 10, [1, 0, 1, 0], { acetylpyrroline: 5, 'cis-3-hexenol': 3 }, { defaultServing: 1, lowStockThreshold: 3 }),
  defineIngredient('elderflower', 'Cvijet bazge (cvat)', 'herb', 'kom', 12, [1, 0, 0, 0], { hotrienol: 4, 'rose-oxide': 3, linalool: 3, 'cis-3-hexenol': 1 }, { defaultServing: 1, lowStockThreshold: 3 }),
  defineIngredient('black-tea', 'Crni čaj', 'herb', 'g', 150, [0, 0, 4, 0], { linalool: 3, geraniol: 2, damascenone: 2, 'beta-ionone': 2, 'cis-3-hexenol': 1 }, { defaultServing: 5, lowStockThreshold: 30 }),
  defineIngredient('lavender', 'Lavanda (grančica)', 'herb', 'kom', 0, [0, 0, 1, 0], { linalool: 5, 'linalyl-acetate': 4, camphor: 1 }, { defaultServing: 1, lowStockThreshold: 3 }),

  // Spices
  defineIngredient('cinnamon', 'Štapić cimeta', 'spice', 'kom', 25, [1, 0, 1, 0], { cinnamaldehyde: 5, eugenol: 2 }, { lowStockThreshold: 5 }),
  defineIngredient('fresh-ginger', 'Svježi đumbir', 'spice', 'g', 200, [0, 0, 1, 0], { zingiberene: 4, gingerol: 4, citral: 3, cineole: 1 }, { defaultServing: 5 }),
  defineIngredient('black-pepper', 'Crni papar', 'spice', 'g', 100, [0, 0, 1, 0], { caryophyllene: 4, rotundone: 3, limonene: 2, 'alpha-pinene': 2 }, { lowStockThreshold: 20 }),
  defineIngredient('star-anise', 'Zvjezdasti anis', 'spice', 'kom', 20, [1, 0, 0, 0], { anethole: 5 }, { lowStockThreshold: 5 }),
  defineIngredient('cardamom', 'Kardamom', 'spice', 'kom', 40, [0, 0, 1, 0], { cineole: 4, 'linalyl-acetate': 2, linalool: 1 }, { defaultServing: 2 }),
  defineIngredient('clove', 'Klinčić', 'spice', 'kom', 50, [0, 0, 2, 0], { eugenol: 5, caryophyllene: 2 }, { defaultServing: 2 }),
  defineIngredient('jalapeno', 'Jalapeño (kolutovi)', 'spice', 'kom', 20, [0, 0, 0, 0], { capsaicin: 5, ibmp: 4 }, { defaultServing: 2, lowStockThreshold: 5 }),

  // Sweeteners
  defineIngredient('simple-syrup', 'Šećerni sirup 1:1', 'sweetener', 'ml', 1500, [10, 0, 0, 0], {}),
  defineIngredient('demerara-syrup', 'Demerara sirup', 'sweetener', 'ml', 750, [10, 0, 0, 0], { maltol: 2, furaneol: 1 }),
  defineIngredient('honey-syrup', 'Medeni sirup', 'sweetener', 'ml', 500, [9, 0, 0, 0], { phenylacetaldehyde: 4, damascenone: 2, hotrienol: 1 }),
  defineIngredient('maple-syrup', 'Javorov sirup', 'sweetener', 'ml', 250, [9, 0, 0, 0], { sotolon: 3, maltol: 3, vanillin: 2 }, { lowStockThreshold: 100 }),
  defineIngredient('grenadine', 'Grenadina', 'sweetener', 'ml', 500, [9, 2, 0, 0], { damascenone: 1, furaneol: 1 }),
  defineIngredient('orgeat', 'Orgeat (bademov sirup)', 'sweetener', 'ml', 500, [9, 0, 0, 0], { benzaldehyde: 4, linalool: 1 }),

  // Bitters (ml; ~1 ml = 1 dash)
  defineIngredient('angostura', 'Angostura bitter', 'bitters', 'ml', 200, [2, 0, 8, 4], { gentiopicroside: 4, eugenol: 3, cinnamaldehyde: 2, cineole: 1 }, { lowStockThreshold: 50 }),
  defineIngredient('orange-bitters', 'Bitter od naranče', 'bitters', 'ml', 100, [1, 0, 7, 4], { limonene: 3, gentiopicroside: 3, decanal: 1 }, { lowStockThreshold: 50 }),

  // Mixers
  defineIngredient('tonic', 'Tonik', 'mixer', 'ml', 3000, [6, 1, 4, 0], { quinine: 4, limonene: 1, citral: 1 }, { lowStockThreshold: 1000 }),
  defineIngredient('soda-water', 'Soda', 'mixer', 'ml', 5000, [0, 0, 0, 0], {}, { lowStockThreshold: 1000 }),
  defineIngredient('ginger-beer', 'Ginger beer', 'mixer', 'ml', 2400, [7, 1, 0, 0], { zingiberene: 3, gingerol: 2, citral: 2 }, { lowStockThreshold: 1000 }),
  defineIngredient('prosecco', 'Prosecco', 'mixer', 'ml', 1500, [3, 3, 0, 4], { 'isoamyl-acetate': 2, 'ethyl-hexanoate': 2, 'hexyl-acetate': 1, linalool: 1 }, { defaultServing: 80, lowStockThreshold: 750 }),

  // Other
  defineIngredient('egg-white', 'Bjelanjak', 'other', 'kom', 30, [0, 0, 0, 0], {}, { defaultServing: 1 }),
  defineIngredient('whole-milk', 'Punomasno mlijeko', 'other', 'ml', 2000, [2, 0, 0, 0], { 'delta-decalactone': 2 }, { defaultServing: 50, lowStockThreshold: 500 }),
];
