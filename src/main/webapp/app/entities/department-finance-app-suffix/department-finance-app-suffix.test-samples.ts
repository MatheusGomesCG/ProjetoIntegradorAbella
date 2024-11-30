import { IDepartmentFinanceAppSuffix, NewDepartmentFinanceAppSuffix } from './department-finance-app-suffix.model';

export const sampleWithRequiredData: IDepartmentFinanceAppSuffix = {
  id: 31762,
  departmentName: 'requite yet',
};

export const sampleWithPartialData: IDepartmentFinanceAppSuffix = {
  id: 6261,
  departmentName: 'boo qua',
};

export const sampleWithFullData: IDepartmentFinanceAppSuffix = {
  id: 28030,
  departmentName: 'function divert',
};

export const sampleWithNewData: NewDepartmentFinanceAppSuffix = {
  departmentName: 'outgoing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
