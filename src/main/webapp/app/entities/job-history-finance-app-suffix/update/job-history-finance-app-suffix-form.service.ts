import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IJobHistoryFinanceAppSuffix, NewJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobHistoryFinanceAppSuffix for edit and NewJobHistoryFinanceAppSuffixFormGroupInput for create.
 */
type JobHistoryFinanceAppSuffixFormGroupInput = IJobHistoryFinanceAppSuffix | PartialWithRequiredKeyOf<NewJobHistoryFinanceAppSuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IJobHistoryFinanceAppSuffix | NewJobHistoryFinanceAppSuffix> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

type JobHistoryFinanceAppSuffixFormRawValue = FormValueOf<IJobHistoryFinanceAppSuffix>;

type NewJobHistoryFinanceAppSuffixFormRawValue = FormValueOf<NewJobHistoryFinanceAppSuffix>;

type JobHistoryFinanceAppSuffixFormDefaults = Pick<NewJobHistoryFinanceAppSuffix, 'id' | 'startDate' | 'endDate'>;

type JobHistoryFinanceAppSuffixFormGroupContent = {
  id: FormControl<JobHistoryFinanceAppSuffixFormRawValue['id'] | NewJobHistoryFinanceAppSuffix['id']>;
  startDate: FormControl<JobHistoryFinanceAppSuffixFormRawValue['startDate']>;
  endDate: FormControl<JobHistoryFinanceAppSuffixFormRawValue['endDate']>;
  language: FormControl<JobHistoryFinanceAppSuffixFormRawValue['language']>;
  job: FormControl<JobHistoryFinanceAppSuffixFormRawValue['job']>;
  department: FormControl<JobHistoryFinanceAppSuffixFormRawValue['department']>;
  employee: FormControl<JobHistoryFinanceAppSuffixFormRawValue['employee']>;
};

export type JobHistoryFinanceAppSuffixFormGroup = FormGroup<JobHistoryFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobHistoryFinanceAppSuffixFormService {
  createJobHistoryFinanceAppSuffixFormGroup(
    jobHistory: JobHistoryFinanceAppSuffixFormGroupInput = { id: null },
  ): JobHistoryFinanceAppSuffixFormGroup {
    const jobHistoryRawValue = this.convertJobHistoryFinanceAppSuffixToJobHistoryFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...jobHistory,
    });
    return new FormGroup<JobHistoryFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: jobHistoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startDate: new FormControl(jobHistoryRawValue.startDate),
      endDate: new FormControl(jobHistoryRawValue.endDate),
      language: new FormControl(jobHistoryRawValue.language),
      job: new FormControl(jobHistoryRawValue.job),
      department: new FormControl(jobHistoryRawValue.department),
      employee: new FormControl(jobHistoryRawValue.employee),
    });
  }

  getJobHistoryFinanceAppSuffix(form: JobHistoryFinanceAppSuffixFormGroup): IJobHistoryFinanceAppSuffix | NewJobHistoryFinanceAppSuffix {
    return this.convertJobHistoryFinanceAppSuffixRawValueToJobHistoryFinanceAppSuffix(
      form.getRawValue() as JobHistoryFinanceAppSuffixFormRawValue | NewJobHistoryFinanceAppSuffixFormRawValue,
    );
  }

  resetForm(form: JobHistoryFinanceAppSuffixFormGroup, jobHistory: JobHistoryFinanceAppSuffixFormGroupInput): void {
    const jobHistoryRawValue = this.convertJobHistoryFinanceAppSuffixToJobHistoryFinanceAppSuffixRawValue({
      ...this.getFormDefaults(),
      ...jobHistory,
    });
    form.reset(
      {
        ...jobHistoryRawValue,
        id: { value: jobHistoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): JobHistoryFinanceAppSuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
    };
  }

  private convertJobHistoryFinanceAppSuffixRawValueToJobHistoryFinanceAppSuffix(
    rawJobHistoryFinanceAppSuffix: JobHistoryFinanceAppSuffixFormRawValue | NewJobHistoryFinanceAppSuffixFormRawValue,
  ): IJobHistoryFinanceAppSuffix | NewJobHistoryFinanceAppSuffix {
    return {
      ...rawJobHistoryFinanceAppSuffix,
      startDate: dayjs(rawJobHistoryFinanceAppSuffix.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawJobHistoryFinanceAppSuffix.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertJobHistoryFinanceAppSuffixToJobHistoryFinanceAppSuffixRawValue(
    jobHistory: IJobHistoryFinanceAppSuffix | (Partial<NewJobHistoryFinanceAppSuffix> & JobHistoryFinanceAppSuffixFormDefaults),
  ): JobHistoryFinanceAppSuffixFormRawValue | PartialWithRequiredKeyOf<NewJobHistoryFinanceAppSuffixFormRawValue> {
    return {
      ...jobHistory,
      startDate: jobHistory.startDate ? jobHistory.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: jobHistory.endDate ? jobHistory.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
