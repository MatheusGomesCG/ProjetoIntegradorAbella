export interface IRegionFinanceAppSuffix {
  id: number;
  regionName?: string | null;
}

export type NewRegionFinanceAppSuffix = Omit<IRegionFinanceAppSuffix, 'id'> & { id: null };
