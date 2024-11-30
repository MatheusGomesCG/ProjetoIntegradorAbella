import dayjs from 'dayjs/esm';

import { IEmployeeFinanceAppSuffix, NewEmployeeFinanceAppSuffix } from './employee-finance-app-suffix.model';

export const sampleWithRequiredData: IEmployeeFinanceAppSuffix = {
  id: 15786,
};

export const sampleWithPartialData: IEmployeeFinanceAppSuffix = {
  id: 1412,
  lastName: 'Oliveira',
  hireDate: dayjs('2024-11-29T12:41'),
  commissionPct: 31976,
};

export const sampleWithFullData: IEmployeeFinanceAppSuffix = {
  id: 11169,
  firstName: 'Ricardo',
  lastName: 'Saraiva',
  email: 'Gustavo.Macedo@gmail.com',
  phoneNumber: 'valiantly',
  hireDate: dayjs('2024-11-28T20:23'),
  salary: 17776,
  commissionPct: 8721,
};

export const sampleWithNewData: NewEmployeeFinanceAppSuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
