import { ILocationFinanceAppSuffix, NewLocationFinanceAppSuffix } from './location-finance-app-suffix.model';

export const sampleWithRequiredData: ILocationFinanceAppSuffix = {
  id: 7574,
};

export const sampleWithPartialData: ILocationFinanceAppSuffix = {
  id: 16737,
  postalCode: 'opposite pfft',
  city: 'Barros de Nossa Senhora',
};

export const sampleWithFullData: ILocationFinanceAppSuffix = {
  id: 24993,
  streetAddress: 'those lest owlishly',
  postalCode: 'after even plus',
  city: 'Carvalho do Descoberto',
  stateProvince: 'cop since',
};

export const sampleWithNewData: NewLocationFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
