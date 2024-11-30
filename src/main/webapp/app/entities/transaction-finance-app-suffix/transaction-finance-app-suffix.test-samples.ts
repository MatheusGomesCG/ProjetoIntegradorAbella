import dayjs from 'dayjs/esm';

import { ITransactionFinanceAppSuffix, NewTransactionFinanceAppSuffix } from './transaction-finance-app-suffix.model';

export const sampleWithRequiredData: ITransactionFinanceAppSuffix = {
  id: 18240,
  transactionDate: dayjs('2024-11-29T12:37'),
  amount: 31739.32,
  transactionType: 'PAYMENT',
};

export const sampleWithPartialData: ITransactionFinanceAppSuffix = {
  id: 2527,
  transactionDate: dayjs('2024-11-28T22:47'),
  amount: 31485.73,
  transactionType: 'DEPOSIT',
};

export const sampleWithFullData: ITransactionFinanceAppSuffix = {
  id: 7805,
  transactionDate: dayjs('2024-11-29T00:53'),
  amount: 29642.88,
  transactionType: 'TRANSFER',
  description: 'achieve',
};

export const sampleWithNewData: NewTransactionFinanceAppSuffix = {
  transactionDate: dayjs('2024-11-29T00:03'),
  amount: 27217.37,
  transactionType: 'TRANSFER',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
