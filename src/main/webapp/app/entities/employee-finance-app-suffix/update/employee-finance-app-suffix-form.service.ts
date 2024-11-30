import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployeeFinanceAppSuffix, NewEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployeeFinanceAppSuffix for edit and NewEmployeeFinanceAppSuffixFormGroupInput for create.
 */
type EmployeeFinanceAppSuffixFormGroupInput = IEmployeeFinanceAppSuffix | PartialWithRequiredKeyOf<NewEmployeeFinanceAppSuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmployeeFinanceAppSuffix | NewEmployeeFinanceAppSuffix> = Omit<T, 'hireDate'> & {
  hireDate?: string | null;
};

type EmployeeFinanceAppSuffixFormRawValue = FormValueOf<IEmployeeFinanceAppSuffix>;

type NewEmployeeFinanceAppSuffixFormRawValue = FormValueOf<NewEmployeeFinanceAppSuffix>;

type EmployeeFinanceAppSuffixFormDefaults = Pick<NewEmployeeFinanceAppSuffix, 'id' | 'hireDate'>;

type EmployeeFinanceAppSuffixFormGroupContent = {
  id: FormControl<EmployeeFinanceAppSuffixFormRawValue['id'] | NewEmployeeFinanceAppSuffix['id']>;
  firstName: FormControl<EmployeeFinanceAppSuffixFormRawValue['firstName']>;
  lastName: FormControl<EmployeeFinanceAppSuffixFormRawValue['lastName']>;
  email: FormControl<EmployeeFinanceAppSuffixFormRawValue['email']>;
  phoneNumber: FormControl<EmployeeFinanceAppSuffixFormRawValue['phoneNumber']>;
  hireDate: FormControl<EmployeeFinanceAppSuffixFormRawValue['hireDate']>;
  salary: FormControl<EmployeeFinanceAppSuffixFormRawValue['salary']>;
  commissionPct: FormControl<EmployeeFinanceAppSuffixFormRawValue['commissionPct']>;
  manager: FormControl<EmployeeFinanceAppSuffixFormRawValue['manager']>;
  department: FormControl<EmployeeFinanceAppSuffixFormRawValue['department']>;
};

export type EmployeeFinanceAppSuffixFormGroup = FormGroup<EmployeeFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeFinanceAppSuffixFormService {
  createEmployeeFinanceAppSuffixFormGroup(
    employee: EmployeeFinanceAppSuffixFormGroupInput = { id: null },
  ): EmployeeFinanceAppSuffixFormGroup {
    const employeeRawValue = this.convertEmployeeFinanceAppSuffixToEmployeeFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...employee,
    });
    return new FormGroup<EmployeeFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: employeeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(employeeRawValue.firstName),
      lastName: new FormControl(employeeRawValue.lastName),
      email: new FormControl(employeeRawValue.email),
      phoneNumber: new FormControl(employeeRawValue.phoneNumber),
      hireDate: new FormControl(employeeRawValue.hireDate),
      salary: new FormControl(employeeRawValue.salary),
      commissionPct: new FormControl(employeeRawValue.commissionPct),
      manager: new FormControl(employeeRawValue.manager),
      department: new FormControl(employeeRawValue.department),
    });
  }

  getEmployeeFinanceAppSuffix(form: EmployeeFinanceAppSuffixFormGroup): IEmployeeFinanceAppSuffix | NewEmployeeFinanceAppSuffix {
    return this.convertEmployeeFinanceAppSuffixRawValueToEmployeeFinanceAppSuffix(
      form.getRawValue() as EmployeeFinanceAppSuffixFormRawValue | NewEmployeeFinanceAppSuffixFormRawValue,
    );
  }

  resetForm(form: EmployeeFinanceAppSuffixFormGroup, employee: EmployeeFinanceAppSuffixFormGroupInput): void {
    const employeeRawValue = this.convertEmployeeFinanceAppSuffixToEmployeeFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...employee,
    });
    form.reset(
      {
        ...employeeRawValue,
        id: { value: employeeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EmployeeFinanceAppSuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      hireDate: currentTime,
    };
  }

  private convertEmployeeFinanceAppSuffixRawValueToEmployeeFinanceAppSuffix(
    rawEmployeeFinanceAppSuffix: EmployeeFinanceAppSuffixFormRawValue | NewEmployeeFinanceAppSuffixFormRawValue,
  ): IEmployeeFinanceAppSuffix | NewEmployeeFinanceAppSuffix {
    return {
      ...rawEmployeeFinanceAppSuffix,
      hireDate: dayjs(rawEmployeeFinanceAppSuffix.hireDate, DATE_TIME_FORMAT),
    };
  }

  private convertEmployeeFinanceAppSuffixToEmployeeFinanceAppSuffixRawValue(
    employee: IEmployeeFinanceAppSuffix | (Partial<NewEmployeeFinanceAppSuffix> & EmployeeFinanceAppSuffixFormDefaults),
  ): EmployeeFinanceAppSuffixFormRawValue | PartialWithRequiredKeyOf<NewEmployeeFinanceAppSuffixFormRawValue> {
    return {
      ...employee,
      hireDate: employee.hireDate ? employee.hireDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
