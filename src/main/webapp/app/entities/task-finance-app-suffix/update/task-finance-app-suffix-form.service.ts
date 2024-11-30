import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITaskFinanceAppSuffix, NewTaskFinanceAppSuffix } from '../task-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaskFinanceAppSuffix for edit and NewTaskFinanceAppSuffixFormGroupInput for create.
 */
type TaskFinanceAppSuffixFormGroupInput = ITaskFinanceAppSuffix | PartialWithRequiredKeyOf<NewTaskFinanceAppSuffix>;

type TaskFinanceAppSuffixFormDefaults = Pick<NewTaskFinanceAppSuffix, 'id' | 'jobs'>;

type TaskFinanceAppSuffixFormGroupContent = {
  id: FormControl<ITaskFinanceAppSuffix['id'] | NewTaskFinanceAppSuffix['id']>;
  title: FormControl<ITaskFinanceAppSuffix['title']>;
  description: FormControl<ITaskFinanceAppSuffix['description']>;
  jobs: FormControl<ITaskFinanceAppSuffix['jobs']>;
};

export type TaskFinanceAppSuffixFormGroup = FormGroup<TaskFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskFinanceAppSuffixFormService {
  createTaskFinanceAppSuffixFormGroup(task: TaskFinanceAppSuffixFormGroupInput = { id: null }): TaskFinanceAppSuffixFormGroup {
    const taskRawValue = {
      ...this.getFormDefaults(),
      ...task,
    };
    return new FormGroup<TaskFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: taskRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(taskRawValue.title),
      description: new FormControl(taskRawValue.description),
      jobs: new FormControl(taskRawValue.jobs ?? []),
    });
  }

  getTaskFinanceAppSuffix(form: TaskFinanceAppSuffixFormGroup): ITaskFinanceAppSuffix | NewTaskFinanceAppSuffix {
    return form.getRawValue() as ITaskFinanceAppSuffix | NewTaskFinanceAppSuffix;
  }

  resetForm(form: TaskFinanceAppSuffixFormGroup, task: TaskFinanceAppSuffixFormGroupInput): void {
    const taskRawValue = { ...this.getFormDefaults(), ...task };
    form.reset(
      {
        ...taskRawValue,
        id: { value: taskRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaskFinanceAppSuffixFormDefaults {
    return {
      id: null,
      jobs: [],
    };
  }
}
