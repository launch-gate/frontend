export interface Prize {
  medalPlace: number;
  type: "MONEY" | "CRYPTO" | "CUSTOM";
  source: string;
}

export interface PrizeData {
  description: string;
  prizes: Prize[];
}

export type PlaceType = "MONEY" | "CRYPTO" | "CUSTOM";

interface IPrizeTypeOption {
  value: PlaceType;
  label: string;
}

export const medalTypesOptions: IPrizeTypeOption[] = [
  { value: "MONEY", label: "Деньги" },
  { value: "CRYPTO", label: "Криптовалюта" },
  { value: "CUSTOM", label: "Другой приз" },
];
