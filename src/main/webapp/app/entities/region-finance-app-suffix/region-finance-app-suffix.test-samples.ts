import { IRegionFinanceAppSuffix, NewRegionFinanceAppSuffix } from './region-finance-app-suffix.model';

export const sampleWithRequiredData: IRegionFinanceAppSuffix = {
  id: 8404,
};

export const sampleWithPartialData: IRegionFinanceAppSuffix = {
  id: 25915,
  regionName: 'poorly yippee',
};

export const sampleWithFullData: IRegionFinanceAppSuffix = {
  id: 19766,
  regionName: 'underpants necessary',
};

export const sampleWithNewData: NewRegionFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
