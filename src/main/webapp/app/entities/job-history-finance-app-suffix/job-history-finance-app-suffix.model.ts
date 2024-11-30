import dayjs from 'dayjs/esm';
import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';
import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { Language } from 'app/entities/enumerations/language.model';

export interface IJobHistoryFinanceAppSuffix {
  id: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  language?: keyof typeof Language | null;
  job?: Pick<IJobFinanceAppSuffix, 'id'> | null;
  department?: Pick<IDepartmentFinanceAppSuffix, 'id'> | null;
  employee?: Pick<IEmployeeFinanceAppSuffix, 'id'> | null;
}

export type NewJobHistoryFinanceAppSuffix = Omit<IJobHistoryFinanceAppSuffix, 'id'> & { id: null };
