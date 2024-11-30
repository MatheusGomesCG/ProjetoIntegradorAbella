import dayjs from 'dayjs/esm';

import { IInvestmentFinanceAppSuffix, NewInvestmentFinanceAppSuffix } from './investment-finance-app-suffix.model';

export const sampleWithRequiredData: IInvestmentFinanceAppSuffix = {
  id: 28726,
  investmentName: 'neaten ew unto',
  investmentType: 'STOCKS',
  amount: 2751.91,
  startDate: dayjs('2024-11-29T00:22'),
};

export const sampleWithPartialData: IInvestmentFinanceAppSuffix = {
  id: 14052,
  investmentName: 'amidst aside in',
  investmentType: 'BONDS',
  amount: 18539.81,
  startDate: dayjs('2024-11-28T22:53'),
  endDate: dayjs('2024-11-29T19:13'),
};

export const sampleWithFullData: IInvestmentFinanceAppSuffix = {
  id: 32320,
  investmentName: 'hence boo',
  investmentType: 'CDI',
  amount: 26573.63,
  startDate: dayjs('2024-11-28T21:54'),
  endDate: dayjs('2024-11-29T18:39'),
};

export const sampleWithNewData: NewInvestmentFinanceAppSuffix = {
  investmentName: 'gallery mortise',
  investmentType: 'REAL_ESTATE',
  amount: 239.48,
  startDate: dayjs('2024-11-29T17:22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
