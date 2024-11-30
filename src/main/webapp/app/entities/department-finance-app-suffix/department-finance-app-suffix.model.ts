import { ILocationFinanceAppSuffix } from 'app/entities/location-finance-app-suffix/location-finance-app-suffix.model';

export interface IDepartmentFinanceAppSuffix {
  id: number;
  departmentName?: string | null;
  location?: Pick<ILocationFinanceAppSuffix, 'id'> | null;
}

export type NewDepartmentFinanceAppSuffix = Omit<IDepartmentFinanceAppSuffix, 'id'> & { id: null };
