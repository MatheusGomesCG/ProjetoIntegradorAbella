import dayjs from 'dayjs/esm';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { AccountType } from 'app/entities/enumerations/account-type.model';
import { AccountStatus } from 'app/entities/enumerations/account-status.model';

export interface IAccountUserFinanceAppSuffix {
  id: number;
  accountNumber?: string | null;
  accountType?: keyof typeof AccountType | null;
  balance?: number | null;
  creationDate?: dayjs.Dayjs | null;
  status?: keyof typeof AccountStatus | null;
  owner?: Pick<IEmployeeFinanceAppSuffix, 'id'> | null;
}

export type NewAccountUserFinanceAppSuffix = Omit<IAccountUserFinanceAppSuffix, 'id'> & { id: null };
