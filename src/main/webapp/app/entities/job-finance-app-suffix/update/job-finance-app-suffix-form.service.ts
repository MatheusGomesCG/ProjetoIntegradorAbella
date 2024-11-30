import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IJobFinanceAppSuffix, NewJobFinanceAppSuffix } from '../job-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobFinanceAppSuffix for edit and NewJobFinanceAppSuffixFormGroupInput for create.
 */
type JobFinanceAppSuffixFormGroupInput = IJobFinanceAppSuffix | PartialWithRequiredKeyOf<NewJobFinanceAppSuffix>;

type JobFinanceAppSuffixFormDefaults = Pick<NewJobFinanceAppSuffix, 'id' | 'tasks'>;

type JobFinanceAppSuffixFormGroupContent = {
  id: FormControl<IJobFinanceAppSuffix['id'] | NewJobFinanceAppSuffix['id']>;
  jobTitle: FormControl<IJobFinanceAppSuffix['jobTitle']>;
  minSalary: FormControl<IJobFinanceAppSuffix['minSalary']>;
  maxSalary: FormControl<IJobFinanceAppSuffix['maxSalary']>;
  tasks: FormControl<IJobFinanceAppSuffix['tasks']>;
  employee: FormControl<IJobFinanceAppSuffix['employee']>;
};

export type JobFinanceAppSuffixFormGroup = FormGroup<JobFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobFinanceAppSuffixFormService {
  createJobFinanceAppSuffixFormGroup(job: JobFinanceAppSuffixFormGroupInput = { id: null }): JobFinanceAppSuffixFormGroup {
    const jobRawValue = {
      ...this.getFormDefaults(),
      ...job,
    };
    return new FormGroup<JobFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: jobRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      jobTitle: new FormControl(jobRawValue.jobTitle),
      minSalary: new FormControl(jobRawValue.minSalary),
      maxSalary: new FormControl(jobRawValue.maxSalary),
      tasks: new FormControl(jobRawValue.tasks ?? []),
      employee: new FormControl(jobRawValue.employee),
    });
  }

  getJobFinanceAppSuffix(form: JobFinanceAppSuffixFormGroup): IJobFinanceAppSuffix | NewJobFinanceAppSuffix {
    return form.getRawValue() as IJobFinanceAppSuffix | NewJobFinanceAppSuffix;
  }

  resetForm(form: JobFinanceAppSuffixFormGroup, job: JobFinanceAppSuffixFormGroupInput): void {
    const jobRawValue = { ...this.getFormDefaults(), ...job };
    form.reset(
      {
        ...jobRawValue,
        id: { value: jobRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): JobFinanceAppSuffixFormDefaults {
    return {
      id: null,
      tasks: [],
    };
  }
}
