import dayjs from 'dayjs/esm';

import { IJobHistoryFinanceAppSuffix, NewJobHistoryFinanceAppSuffix } from './job-history-finance-app-suffix.model';

export const sampleWithRequiredData: IJobHistoryFinanceAppSuffix = {
  id: 7898,
};

export const sampleWithPartialData: IJobHistoryFinanceAppSuffix = {
  id: 19761,
  startDate: dayjs('2024-11-29T00:24'),
  endDate: dayjs('2024-11-29T08:21'),
};

export const sampleWithFullData: IJobHistoryFinanceAppSuffix = {
  id: 114,
  startDate: dayjs('2024-11-29T19:36'),
  endDate: dayjs('2024-11-29T16:39'),
  language: 'PORTUGUESE',
};

export const sampleWithNewData: NewJobHistoryFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
