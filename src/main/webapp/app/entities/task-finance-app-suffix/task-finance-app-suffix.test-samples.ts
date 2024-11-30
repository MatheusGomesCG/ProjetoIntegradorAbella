import { ITaskFinanceAppSuffix, NewTaskFinanceAppSuffix } from './task-finance-app-suffix.model';

export const sampleWithRequiredData: ITaskFinanceAppSuffix = {
  id: 8279,
};

export const sampleWithPartialData: ITaskFinanceAppSuffix = {
  id: 24175,
  description: 'huzzah',
};

export const sampleWithFullData: ITaskFinanceAppSuffix = {
  id: 16041,
  title: 'um the than',
  description: 'provided if',
};

export const sampleWithNewData: NewTaskFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
