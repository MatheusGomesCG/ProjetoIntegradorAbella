import { ITaskFinanceAppSuffix } from 'app/entities/task-finance-app-suffix/task-finance-app-suffix.model';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';

export interface IJobFinanceAppSuffix {
  id: number;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  tasks?: Pick<ITaskFinanceAppSuffix, 'id' | 'title'>[] | null;
  employee?: Pick<IEmployeeFinanceAppSuffix, 'id'> | null;
}

export type NewJobFinanceAppSuffix = Omit<IJobFinanceAppSuffix, 'id'> & { id: null };
