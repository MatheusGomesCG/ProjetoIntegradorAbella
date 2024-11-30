import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from 'app/entities/job-finance-app-suffix/service/job-finance-app-suffix.service';
import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';
import { TaskFinanceAppSuffixService } from '../service/task-finance-app-suffix.service';
import { TaskFinanceAppSuffixFormGroup, TaskFinanceAppSuffixFormService } from './task-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-task-finance-app-suffix-update',
  templateUrl: './task-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaskFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  task: ITaskFinanceAppSuffix | null = null;

  jobsSharedCollection: IJobFinanceAppSuffix[] = [];

  protected taskService = inject(TaskFinanceAppSuffixService);
  protected taskFormService = inject(TaskFinanceAppSuffixFormService);
  protected jobService = inject(JobFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaskFinanceAppSuffixFormGroup = this.taskFormService.createTaskFinanceAppSuffixFormGroup();

  compareJobFinanceAppSuffix = (o1: IJobFinanceAppSuffix | null, o2: IJobFinanceAppSuffix | null): boolean =>
    this.jobService.compareJobFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
      if (task) {
        this.updateForm(task);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.taskFormService.getTaskFinanceAppSuffix(this.editForm);
    if (task.id !== null) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskFinanceAppSuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(task: ITaskFinanceAppSuffix): void {
    this.task = task;
    this.taskFormService.resetForm(this.editForm, task);

    this.jobsSharedCollection = this.jobService.addJobFinanceAppSuffixToCollectionIfMissing<IJobFinanceAppSuffix>(
      this.jobsSharedCollection,
      ...(task.jobs ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query()
      .pipe(map((res: HttpResponse<IJobFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((jobs: IJobFinanceAppSuffix[]) =>
          this.jobService.addJobFinanceAppSuffixToCollectionIfMissing<IJobFinanceAppSuffix>(jobs, ...(this.task?.jobs ?? [])),
        ),
      )
      .subscribe((jobs: IJobFinanceAppSuffix[]) => (this.jobsSharedCollection = jobs));
  }
}
