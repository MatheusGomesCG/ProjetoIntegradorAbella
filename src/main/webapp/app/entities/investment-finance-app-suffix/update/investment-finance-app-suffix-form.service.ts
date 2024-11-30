import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInvestmentFinanceAppSuffix, NewInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvestmentFinanceAppSuffix for edit and NewInvestmentFinanceAppSuffixFormGroupInput for create.
 */
type InvestmentFinanceAppSuffixFormGroupInput = IInvestmentFinanceAppSuffix | PartialWithRequiredKeyOf<NewInvestmentFinanceAppSuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IInvestmentFinanceAppSuffix | NewInvestmentFinanceAppSuffix> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

type InvestmentFinanceAppSuffixFormRawValue = FormValueOf<IInvestmentFinanceAppSuffix>;

type NewInvestmentFinanceAppSuffixFormRawValue = FormValueOf<NewInvestmentFinanceAppSuffix>;

type InvestmentFinanceAppSuffixFormDefaults = Pick<NewInvestmentFinanceAppSuffix, 'id' | 'startDate' | 'endDate'>;

type InvestmentFinanceAppSuffixFormGroupContent = {
  id: FormControl<InvestmentFinanceAppSuffixFormRawValue['id'] | NewInvestmentFinanceAppSuffix['id']>;
  investmentName: FormControl<InvestmentFinanceAppSuffixFormRawValue['investmentName']>;
  investmentType: FormControl<InvestmentFinanceAppSuffixFormRawValue['investmentType']>;
  amount: FormControl<InvestmentFinanceAppSuffixFormRawValue['amount']>;
  startDate: FormControl<InvestmentFinanceAppSuffixFormRawValue['startDate']>;
  endDate: FormControl<InvestmentFinanceAppSuffixFormRawValue['endDate']>;
  account: FormControl<InvestmentFinanceAppSuffixFormRawValue['account']>;
};

export type InvestmentFinanceAppSuffixFormGroup = FormGroup<InvestmentFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvestmentFinanceAppSuffixFormService {
  createInvestmentFinanceAppSuffixFormGroup(
    investment: InvestmentFinanceAppSuffixFormGroupInput = { id: null },
  ): InvestmentFinanceAppSuffixFormGroup {
    const investmentRawValue = this.convertInvestmentFinanceAppSuffixToInvestmentFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...investment,
    });
    return new FormGroup<InvestmentFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: investmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      investmentName: new FormControl(investmentRawValue.investmentName, {
        validators: [Validators.required],
      }),
      investmentType: new FormControl(investmentRawValue.investmentType, {
        validators: [Validators.required],
      }),
      amount: new FormControl(investmentRawValue.amount, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(investmentRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(investmentRawValue.endDate),
      account: new FormControl(investmentRawValue.account),
    });
  }

  getInvestmentFinanceAppSuffix(form: InvestmentFinanceAppSuffixFormGroup): IInvestmentFinanceAppSuffix | NewInvestmentFinanceAppSuffix {
    return this.convertInvestmentFinanceAppSuffixRawValueToInvestmentFinanceAppSuffix(
      form.getRawValue() as InvestmentFinanceAppSuffixFormRawValue | NewInvestmentFinanceAppSuffixFormRawValue,
    );
  }

  resetForm(form: InvestmentFinanceAppSuffixFormGroup, investment: InvestmentFinanceAppSuffixFormGroupInput): void {
    const investmentRawValue = this.convertInvestmentFinanceAppSuffixToInvestmentFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...investment,
    });
    form.reset(
      {
        ...investmentRawValue,
        id: { value: investmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InvestmentFinanceAppSuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
    };
  }

  private convertInvestmentFinanceAppSuffixRawValueToInvestmentFinanceAppSuffix(
    rawInvestmentFinanceAppSuffix: InvestmentFinanceAppSuffixFormRawValue | NewInvestmentFinanceAppSuffixFormRawValue,
  ): IInvestmentFinanceAppSuffix | NewInvestmentFinanceAppSuffix {
    return {
      ...rawInvestmentFinanceAppSuffix,
      startDate: dayjs(rawInvestmentFinanceAppSuffix.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawInvestmentFinanceAppSuffix.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertInvestmentFinanceAppSuffixToInvestmentFinanceAppSuffixRawValue(
    investment: IInvestmentFinanceAppSuffix | (Partial<NewInvestmentFinanceAppSuffix> & InvestmentFinanceAppSuffixFormDefaults),
  ): InvestmentFinanceAppSuffixFormRawValue | PartialWithRequiredKeyOf<NewInvestmentFinanceAppSuffixFormRawValue> {
    return {
      ...investment,
      startDate: investment.startDate ? investment.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: investment.endDate ? investment.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
