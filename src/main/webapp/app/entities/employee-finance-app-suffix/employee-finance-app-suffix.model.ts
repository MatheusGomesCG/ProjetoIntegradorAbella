import dayjs from 'dayjs/esm';
import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';

export interface IEmployeeFinanceAppSuffix {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  salary?: number | null;
  commissionPct?: number | null;
  manager?: Pick<IEmployeeFinanceAppSuffix, 'id'> | null;
  department?: Pick<IDepartmentFinanceAppSuffix, 'id'> | null;
}

export type NewEmployeeFinanceAppSuffix = Omit<IEmployeeFinanceAppSuffix, 'id'> & { id: null };
