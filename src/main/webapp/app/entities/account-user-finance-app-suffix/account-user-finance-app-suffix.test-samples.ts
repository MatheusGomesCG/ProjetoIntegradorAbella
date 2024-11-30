import dayjs from 'dayjs/esm';

import { IAccountUserFinanceAppSuffix, NewAccountUserFinanceAppSuffix } from './account-user-finance-app-suffix.model';

export const sampleWithRequiredData: IAccountUserFinanceAppSuffix = {
  id: 11549,
  accountNumber: 'furiously pike',
  accountType: 'CREDIT',
  balance: 30652.98,
  creationDate: dayjs('2024-11-28T22:18'),
  status: 'SUSPENDED',
};

export const sampleWithPartialData: IAccountUserFinanceAppSuffix = {
  id: 13712,
  accountNumber: 'postbox',
  accountType: 'CREDIT',
  balance: 19476.65,
  creationDate: dayjs('2024-11-29T14:06'),
  status: 'CLOSED',
};

export const sampleWithFullData: IAccountUserFinanceAppSuffix = {
  id: 27446,
  accountNumber: 'clamp',
  accountType: 'CURRENT',
  balance: 16528.37,
  creationDate: dayjs('2024-11-29T02:29'),
  status: 'SUSPENDED',
};

export const sampleWithNewData: NewAccountUserFinanceAppSuffix = {
  accountNumber: 'beloved yuck',
  accountType: 'CREDIT',
  balance: 16829.41,
  creationDate: dayjs('2024-11-29T00:37'),
  status: 'SUSPENDED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
