import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITransactionFinanceAppSuffix, NewTransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransactionFinanceAppSuffix for edit and NewTransactionFinanceAppSuffixFormGroupInput for create.
 */
type TransactionFinanceAppSuffixFormGroupInput = ITransactionFinanceAppSuffix | PartialWithRequiredKeyOf<NewTransactionFinanceAppSuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITransactionFinanceAppSuffix | NewTransactionFinanceAppSuffix> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

type TransactionFinanceAppSuffixFormRawValue = FormValueOf<ITransactionFinanceAppSuffix>;

type NewTransactionFinanceAppSuffixFormRawValue = FormValueOf<NewTransactionFinanceAppSuffix>;

type TransactionFinanceAppSuffixFormDefaults = Pick<NewTransactionFinanceAppSuffix, 'id' | 'transactionDate'>;

type TransactionFinanceAppSuffixFormGroupContent = {
  id: FormControl<TransactionFinanceAppSuffixFormRawValue['id'] | NewTransactionFinanceAppSuffix['id']>;
  transactionDate: FormControl<TransactionFinanceAppSuffixFormRawValue['transactionDate']>;
  amount: FormControl<TransactionFinanceAppSuffixFormRawValue['amount']>;
  transactionType: FormControl<TransactionFinanceAppSuffixFormRawValue['transactionType']>;
  description: FormControl<TransactionFinanceAppSuffixFormRawValue['description']>;
  account: FormControl<TransactionFinanceAppSuffixFormRawValue['account']>;
};

export type TransactionFinanceAppSuffixFormGroup = FormGroup<TransactionFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionFinanceAppSuffixFormService {
  createTransactionFinanceAppSuffixFormGroup(
    transaction: TransactionFinanceAppSuffixFormGroupInput = { id: null },
  ): TransactionFinanceAppSuffixFormGroup {
    const transactionRawValue = this.convertTransactionFinanceAppSuffixToTransactionFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...transaction,
    });
    return new FormGroup<TransactionFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: transactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      transactionDate: new FormControl(transactionRawValue.transactionDate, {
        validators: [Validators.required],
      }),
      amount: new FormControl(transactionRawValue.amount, {
        validators: [Validators.required],
      }),
      transactionType: new FormControl(transactionRawValue.transactionType, {
        validators: [Validators.required],
      }),
      description: new FormControl(transactionRawValue.description),
      account: new FormControl(transactionRawValue.account),
    });
  }

  getTransactionFinanceAppSuffix(
    form: TransactionFinanceAppSuffixFormGroup,
  ): ITransactionFinanceAppSuffix | NewTransactionFinanceAppSuffix {
    return this.convertTransactionFinanceAppSuffixRawValueToTransactionFinanceAppSuffix(
      form.getRawValue() as TransactionFinanceAppSuffixFormRawValue | NewTransactionFinanceAppSuffixFormRawValue,
    );
  }

  resetForm(form: TransactionFinanceAppSuffixFormGroup, transaction: TransactionFinanceAppSuffixFormGroupInput): void {
    const transactionRawValue = this.convertTransactionFinanceAppSuffixToTransactionFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...transaction,
    });
    form.reset(
      {
        ...transactionRawValue,
        id: { value: transactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TransactionFinanceAppSuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      transactionDate: currentTime,
    };
  }

  private convertTransactionFinanceAppSuffixRawValueToTransactionFinanceAppSuffix(
    rawTransactionFinanceAppSuffix: TransactionFinanceAppSuffixFormRawValue | NewTransactionFinanceAppSuffixFormRawValue,
  ): ITransactionFinanceAppSuffix | NewTransactionFinanceAppSuffix {
    return {
      ...rawTransactionFinanceAppSuffix,
      transactionDate: dayjs(rawTransactionFinanceAppSuffix.transactionDate, DATE_TIME_FORMAT),
    };
  }

  private convertTransactionFinanceAppSuffixToTransactionFinanceAppSuffixRawValue(
    transaction: ITransactionFinanceAppSuffix | (Partial<NewTransactionFinanceAppSuffix> & TransactionFinanceAppSuffixFormDefaults),
  ): TransactionFinanceAppSuffixFormRawValue | PartialWithRequiredKeyOf<NewTransactionFinanceAppSuffixFormRawValue> {
    return {
      ...transaction,
      transactionDate: transaction.transactionDate ? transaction.transactionDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
