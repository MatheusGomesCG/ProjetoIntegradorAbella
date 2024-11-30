import dayjs from 'dayjs/esm';
import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { TransactionType } from 'app/entities/enumerations/transaction-type.model';

export interface ITransactionFinanceAppSuffix {
  id: number;
  transactionDate?: dayjs.Dayjs | null;
  amount?: number | null;
  transactionType?: keyof typeof TransactionType | null;
  description?: string | null;
  account?: Pick<IAccountUserFinanceAppSuffix, 'id'> | null;
}

export type NewTransactionFinanceAppSuffix = Omit<ITransactionFinanceAppSuffix, 'id'> & { id: null };
