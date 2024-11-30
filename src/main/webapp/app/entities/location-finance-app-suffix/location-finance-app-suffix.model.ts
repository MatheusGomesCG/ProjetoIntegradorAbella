import { ICountryFinanceAppSuffix } from 'app/entities/country-finance-app-suffix/country-finance-app-suffix.model';

export interface ILocationFinanceAppSuffix {
  id: number;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  country?: Pick<ICountryFinanceAppSuffix, 'id'> | null;
}

export type NewLocationFinanceAppSuffix = Omit<ILocationFinanceAppSuffix, 'id'> & { id: null };
