import type { BrandVehicles } from "@/types";

// Year ranges are realistic generalizations; yearEnd omitted means "présent".
export const vehicles: BrandVehicles[] = [
  {
    brandSlug: "chery",
    models: [
      { slug: "tiggo-2-pro", name: "Tiggo 2 Pro", yearStart: 2019, engines: ["1.5L MPI"] },
      { slug: "tiggo-4-pro", name: "Tiggo 4 Pro", yearStart: 2020, engines: ["1.5L MPI", "1.5T"] },
      { slug: "tiggo-7-pro", name: "Tiggo 7 Pro", yearStart: 2020, engines: ["1.5T", "1.6T"] },
      { slug: "tiggo-8-pro", name: "Tiggo 8 Pro", yearStart: 2019, engines: ["1.6T", "2.0T"] },
      { slug: "arrizo-5", name: "Arrizo 5", yearStart: 2018, engines: ["1.5L", "1.5T"] },
      { slug: "omoda-5", name: "Omoda 5", yearStart: 2022, engines: ["1.5T", "1.6T"] },
    ],
  },
  {
    brandSlug: "geely",
    models: [
      { slug: "coolray", name: "Coolray", yearStart: 2019, engines: ["1.5T"] },
      { slug: "emgrand", name: "Emgrand", yearStart: 2018, engines: ["1.5L", "1.4T"] },
      { slug: "azkarra", name: "Azkarra (Atlas)", yearStart: 2019, engines: ["1.8T", "2.0T"] },
      { slug: "tugella", name: "Tugella", yearStart: 2020, engines: ["2.0T"] },
      { slug: "gx3-pro", name: "GX3 Pro", yearStart: 2021, engines: ["1.5L"] },
      { slug: "monjaro", name: "Monjaro", yearStart: 2022, engines: ["2.0T"] },
    ],
  },
  {
    brandSlug: "mg",
    models: [
      { slug: "mg5", name: "MG5", yearStart: 2020, engines: ["1.5L"] },
      { slug: "zs", name: "MG ZS", yearStart: 2017, engines: ["1.5L", "1.0T"] },
      { slug: "hs", name: "MG HS", yearStart: 2018, engines: ["1.5T", "2.0T"] },
      { slug: "rx5", name: "MG RX5", yearStart: 2019, engines: ["1.5T", "2.0T"] },
      { slug: "one", name: "MG ONE", yearStart: 2021, engines: ["1.5T"] },
    ],
  },
  {
    brandSlug: "dfsk",
    models: [
      { slug: "glory-500", name: "Glory 500", yearStart: 2017, engines: ["1.5T"] },
      { slug: "glory-580", name: "Glory 580", yearStart: 2016, engines: ["1.5T", "1.8L"] },
      { slug: "k01", name: "K01", yearStart: 2015, engines: ["1.2L"] },
      { slug: "c31", name: "C31", yearStart: 2016, engines: ["1.2L"] },
      { slug: "c35", name: "C35", yearStart: 2016, engines: ["1.5L"] },
    ],
  },
  {
    brandSlug: "great-wall",
    models: [
      { slug: "wingle", name: "Wingle 5/7", yearStart: 2014, engines: ["2.0L Diesel", "2.4L"] },
      { slug: "poer", name: "Poer", yearStart: 2019, engines: ["2.0T Diesel", "2.0T"] },
      { slug: "steed", name: "Steed", yearStart: 2015, engines: ["2.4L", "2.0L Diesel"] },
    ],
  },
  {
    brandSlug: "haval",
    models: [
      { slug: "jolion", name: "Jolion", yearStart: 2021, engines: ["1.5T"] },
      { slug: "h6", name: "H6", yearStart: 2011, engines: ["1.5T", "2.0T"] },
      { slug: "h2", name: "H2", yearStart: 2014, yearEnd: 2022, engines: ["1.5T"] },
      { slug: "f7", name: "F7", yearStart: 2019, engines: ["1.5T", "2.0T"] },
      { slug: "h9", name: "H9", yearStart: 2014, engines: ["2.0T"] },
    ],
  },
  {
    brandSlug: "jac",
    models: [
      { slug: "j7", name: "J7", yearStart: 2020, engines: ["1.5T"] },
      { slug: "js4", name: "JS4", yearStart: 2019, engines: ["1.5L", "1.5T"] },
      { slug: "t6", name: "T6", yearStart: 2015, engines: ["2.0T", "2.0T Diesel"] },
      { slug: "t8", name: "T8", yearStart: 2018, engines: ["2.0T Diesel"] },
      { slug: "refine", name: "Refine", yearStart: 2016, engines: ["2.0L"] },
    ],
  },
  {
    brandSlug: "byd",
    models: [
      { slug: "song", name: "Song", yearStart: 2017, engines: ["1.5T", "Hybride"] },
      { slug: "atto-3", name: "Atto 3 (Yuan Plus)", yearStart: 2022, engines: ["Électrique"] },
      { slug: "dolphin", name: "Dolphin", yearStart: 2021, engines: ["Électrique"] },
      { slug: "han", name: "Han", yearStart: 2020, engines: ["Électrique", "Hybride"] },
      { slug: "seal", name: "Seal", yearStart: 2022, engines: ["Électrique"] },
    ],
  },
  {
    brandSlug: "baic",
    models: [
      { slug: "x25", name: "X25", yearStart: 2015, engines: ["1.5L"] },
      { slug: "x35", name: "X35", yearStart: 2018, engines: ["1.5L"] },
      { slug: "x55", name: "X55", yearStart: 2019, engines: ["1.5T"] },
      { slug: "d20", name: "D20", yearStart: 2016, engines: ["1.3L", "1.5L"] },
      { slug: "senova", name: "Senova", yearStart: 2015, engines: ["1.5L", "1.5T"] },
    ],
  },
  {
    brandSlug: "dongfeng",
    models: [
      { slug: "ax7", name: "AX7", yearStart: 2015, engines: ["1.6T", "2.0T"] },
      { slug: "t5-evo", name: "T5 Evo", yearStart: 2021, engines: ["1.5T"] },
      { slug: "rich-6", name: "Rich 6", yearStart: 2018, engines: ["2.0T Diesel"] },
      { slug: "s30", name: "S30", yearStart: 2015, engines: ["1.6L"] },
    ],
  },
  {
    brandSlug: "jetour",
    models: [
      { slug: "x70", name: "X70", yearStart: 2018, engines: ["1.5T", "2.0T"] },
      { slug: "x70-plus", name: "X70 Plus", yearStart: 2019, engines: ["1.5T", "1.6T"] },
      { slug: "x90", name: "X90", yearStart: 2019, engines: ["1.5T", "1.6T"] },
      { slug: "dashing", name: "Dashing", yearStart: 2022, engines: ["1.5T", "1.6T"] },
    ],
  },
  {
    brandSlug: "faw",
    models: [
      { slug: "bestune-t77", name: "Bestune T77", yearStart: 2018, engines: ["1.2T", "1.5T"] },
      { slug: "bestune-t99", name: "Bestune T99", yearStart: 2019, engines: ["2.0T"] },
      { slug: "besturn-b30", name: "Besturn B30", yearStart: 2015, engines: ["1.6L"] },
      { slug: "junpai", name: "Junpai", yearStart: 2016, engines: ["1.5L"] },
    ],
  },
  {
    brandSlug: "changan",
    models: [
      { slug: "cs35-plus", name: "CS35 Plus", yearStart: 2018, engines: ["1.6L", "1.4T"] },
      { slug: "cs55", name: "CS55", yearStart: 2018, engines: ["1.5T"] },
      { slug: "cs75", name: "CS75 Plus", yearStart: 2019, engines: ["1.5T", "2.0T"] },
      { slug: "eado", name: "Eado", yearStart: 2016, engines: ["1.6L"] },
      { slug: "alsvin", name: "Alsvin", yearStart: 2019, engines: ["1.5L"] },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function getVehiclesForBrand(brandSlug: string) {
  return vehicles.find((v) => v.brandSlug === brandSlug);
}

export function yearsForModel(yearStart: number, yearEnd?: number): number[] {
  const end = yearEnd ?? CURRENT_YEAR;
  const out: number[] = [];
  for (let y = end; y >= yearStart; y--) out.push(y);
  return out;
}

export { CURRENT_YEAR };
