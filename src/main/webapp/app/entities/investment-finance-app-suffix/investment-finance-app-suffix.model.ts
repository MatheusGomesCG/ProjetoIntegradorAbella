import dayjs from 'dayjs/esm';
import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { InvestmentType } from 'app/entities/enumerations/investment-type.model';

export interface IInvestmentFinanceAppSuffix {
  id: number;
  investmentName?: string | null;
  investmentType?: keyof typeof InvestmentType | null;
  amount?: number | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  account?: Pick<IAccountUserFinanceAppSuffix, 'id'> | null;
}

export type NewInvestmentFinanceAppSuffix = Omit<IInvestmentFinanceAppSuffix, 'id'> & { id: null };
