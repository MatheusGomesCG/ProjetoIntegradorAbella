import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';

export interface ITaskFinanceAppSuffix {
  id: number;
  title?: string | null;
  description?: string | null;
  jobs?: Pick<IJobFinanceAppSuffix, 'id'>[] | null;
}

export type NewTaskFinanceAppSuffix = Omit<ITaskFinanceAppSuffix, 'id'> & { id: null };
