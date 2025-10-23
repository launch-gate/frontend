export interface IGetCompetition {
  find: string;
  page: number;
}

export interface ICompetition {
  cargoTypeGUID: string;
  cargoTypeName: string;
  cargoTypeMinT: number;
  cargoTypeMaxT: number;
}
