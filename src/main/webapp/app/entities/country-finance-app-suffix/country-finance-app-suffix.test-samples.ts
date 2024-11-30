import { ICountryFinanceAppSuffix, NewCountryFinanceAppSuffix } from './country-finance-app-suffix.model';

export const sampleWithRequiredData: ICountryFinanceAppSuffix = {
  id: 752,
};

export const sampleWithPartialData: ICountryFinanceAppSuffix = {
  id: 18652,
};

export const sampleWithFullData: ICountryFinanceAppSuffix = {
  id: 24646,
  countryName: 'pushy even',
};

export const sampleWithNewData: NewCountryFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
