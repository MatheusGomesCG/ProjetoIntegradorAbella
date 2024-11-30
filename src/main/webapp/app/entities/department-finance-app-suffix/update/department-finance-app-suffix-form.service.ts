import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDepartmentFinanceAppSuffix, NewDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDepartmentFinanceAppSuffix for edit and NewDepartmentFinanceAppSuffixFormGroupInput for create.
 */
type DepartmentFinanceAppSuffixFormGroupInput = IDepartmentFinanceAppSuffix | PartialWithRequiredKeyOf<NewDepartmentFinanceAppSuffix>;

type DepartmentFinanceAppSuffixFormDefaults = Pick<NewDepartmentFinanceAppSuffix, 'id'>;

type DepartmentFinanceAppSuffixFormGroupContent = {
  id: FormControl<IDepartmentFinanceAppSuffix['id'] | NewDepartmentFinanceAppSuffix['id']>;
  departmentName: FormControl<IDepartmentFinanceAppSuffix['departmentName']>;
  location: FormControl<IDepartmentFinanceAppSuffix['location']>;
};

export type DepartmentFinanceAppSuffixFormGroup = FormGroup<DepartmentFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DepartmentFinanceAppSuffixFormService {
  createDepartmentFinanceAppSuffixFormGroup(
    department: DepartmentFinanceAppSuffixFormGroupInput = { id: null },
  ): DepartmentFinanceAppSuffixFormGroup {
    const departmentRawValue = {
      ...this.getFormDefaults(),
      ...department,
    };
    return new FormGroup<DepartmentFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: departmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      departmentName: new FormControl(departmentRawValue.departmentName, {
        validators: [Validators.required],
      }),
      location: new FormControl(departmentRawValue.location),
    });
  }

  getDepartmentFinanceAppSuffix(form: DepartmentFinanceAppSuffixFormGroup): IDepartmentFinanceAppSuffix | NewDepartmentFinanceAppSuffix {
    return form.getRawValue() as IDepartmentFinanceAppSuffix | NewDepartmentFinanceAppSuffix;
  }

  resetForm(form: DepartmentFinanceAppSuffixFormGroup, department: DepartmentFinanceAppSuffixFormGroupInput): void {
    const departmentRawValue = { ...this.getFormDefaults(), ...department };
    form.reset(
      {
        ...departmentRawValue,
        id: { value: departmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DepartmentFinanceAppSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
