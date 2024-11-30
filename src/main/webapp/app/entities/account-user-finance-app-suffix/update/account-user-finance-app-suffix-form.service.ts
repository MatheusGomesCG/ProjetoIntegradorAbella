import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAccountUserFinanceAppSuffix, NewAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountUserFinanceAppSuffix for edit and NewAccountUserFinanceAppSuffixFormGroupInput for create.
 */
type AccountUserFinanceAppSuffixFormGroupInput = IAccountUserFinanceAppSuffix | PartialWithRequiredKeyOf<NewAccountUserFinanceAppSuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAccountUserFinanceAppSuffix | NewAccountUserFinanceAppSuffix> = Omit<T, 'creationDate'> & {
  creationDate?: string | null;
};

type AccountUserFinanceAppSuffixFormRawValue = FormValueOf<IAccountUserFinanceAppSuffix>;

type NewAccountUserFinanceAppSuffixFormRawValue = FormValueOf<NewAccountUserFinanceAppSuffix>;

type AccountUserFinanceAppSuffixFormDefaults = Pick<NewAccountUserFinanceAppSuffix, 'id' | 'creationDate'>;

type AccountUserFinanceAppSuffixFormGroupContent = {
  id: FormControl<AccountUserFinanceAppSuffixFormRawValue['id'] | NewAccountUserFinanceAppSuffix['id']>;
  accountNumber: FormControl<AccountUserFinanceAppSuffixFormRawValue['accountNumber']>;
  accountType: FormControl<AccountUserFinanceAppSuffixFormRawValue['accountType']>;
  balance: FormControl<AccountUserFinanceAppSuffixFormRawValue['balance']>;
  creationDate: FormControl<AccountUserFinanceAppSuffixFormRawValue['creationDate']>;
  status: FormControl<AccountUserFinanceAppSuffixFormRawValue['status']>;
  owner: FormControl<AccountUserFinanceAppSuffixFormRawValue['owner']>;
};

export type AccountUserFinanceAppSuffixFormGroup = FormGroup<AccountUserFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountUserFinanceAppSuffixFormService {
  createAccountUserFinanceAppSuffixFormGroup(
    accountUser: AccountUserFinanceAppSuffixFormGroupInput = { id: null },
  ): AccountUserFinanceAppSuffixFormGroup {
    const accountUserRawValue = this.convertAccountUserFinanceAppSuffixToAccountUserFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...accountUser,
    });
    return new FormGroup<AccountUserFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: accountUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      accountNumber: new FormControl(accountUserRawValue.accountNumber, {
        validators: [Validators.required],
      }),
      accountType: new FormControl(accountUserRawValue.accountType, {
        validators: [Validators.required],
      }),
      balance: new FormControl(accountUserRawValue.balance, {
        validators: [Validators.required],
      }),
      creationDate: new FormControl(accountUserRawValue.creationDate, {
        validators: [Validators.required],
      }),
      status: new FormControl(accountUserRawValue.status, {
        validators: [Validators.required],
      }),
      owner: new FormControl(accountUserRawValue.owner),
    });
  }

  getAccountUserFinanceAppSuffix(
    form: AccountUserFinanceAppSuffixFormGroup,
  ): IAccountUserFinanceAppSuffix | NewAccountUserFinanceAppSuffix {
    return this.convertAccountUserFinanceAppSuffixRawValueToAccountUserFinanceAppSuffix(
      form.getRawValue() as AccountUserFinanceAppSuffixFormRawValue | NewAccountUserFinanceAppSuffixFormRawValue,
    );
  }

  resetForm(form: AccountUserFinanceAppSuffixFormGroup, accountUser: AccountUserFinanceAppSuffixFormGroupInput): void {
    const accountUserRawValue = this.convertAccountUserFinanceAppSuffixToAccountUserFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...accountUser,
    });
    form.reset(
      {
        ...accountUserRawValue,
        id: { value: accountUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AccountUserFinanceAppSuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      creationDate: currentTime,
    };
  }

  private convertAccountUserFinanceAppSuffixRawValueToAccountUserFinanceAppSuffix(
    rawAccountUserFinanceAppSuffix: AccountUserFinanceAppSuffixFormRawValue | NewAccountUserFinanceAppSuffixFormRawValue,
  ): IAccountUserFinanceAppSuffix | NewAccountUserFinanceAppSuffix {
    return {
      ...rawAccountUserFinanceAppSuffix,
      creationDate: dayjs(rawAccountUserFinanceAppSuffix.creationDate, DATE_TIME_FORMAT),
    };
  }

  private convertAccountUserFinanceAppSuffixToAccountUserFinanceAppSuffixRawValue(
    accountUser: IAccountUserFinanceAppSuffix | (Partial<NewAccountUserFinanceAppSuffix> & AccountUserFinanceAppSuffixFormDefaults),
  ): AccountUserFinanceAppSuffixFormRawValue | PartialWithRequiredKeyOf<NewAccountUserFinanceAppSuffixFormRawValue> {
    return {
      ...accountUser,
      creationDate: accountUser.creationDate ? accountUser.creationDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
