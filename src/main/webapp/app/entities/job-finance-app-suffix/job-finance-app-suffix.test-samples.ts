import { IJobFinanceAppSuffix, NewJobFinanceAppSuffix } from './job-finance-app-suffix.model';

export const sampleWithRequiredData: IJobFinanceAppSuffix = {
  id: 31291,
};

export const sampleWithPartialData: IJobFinanceAppSuffix = {
  id: 21335,
  jobTitle: 'Regional Otimização Coordenador',
  maxSalary: 4235,
};

export const sampleWithFullData: IJobFinanceAppSuffix = {
  id: 21790,
  jobTitle: 'Regional Implementação Representante',
  minSalary: 10230,
  maxSalary: 11293,
};

export const sampleWithNewData: NewJobFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
