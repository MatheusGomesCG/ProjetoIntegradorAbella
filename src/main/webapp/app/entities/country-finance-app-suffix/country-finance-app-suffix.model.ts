import { IRegionFinanceAppSuffix } from 'app/entities/region-finance-app-suffix/region-finance-app-suffix.model';

export interface ICountryFinanceAppSuffix {
  id: number;
  countryName?: string | null;
  region?: Pick<IRegionFinanceAppSuffix, 'id'> | null;
}

export type NewCountryFinanceAppSuffix = Omit<ICountryFinanceAppSuffix, 'id'> & { id: null };
