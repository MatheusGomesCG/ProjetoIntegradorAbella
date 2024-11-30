import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITaskFinanceAppSuffix } from 'app/entities/task-finance-app-suffix/task-finance-app-suffix.model';
import { TaskFinanceAppSuffixService } from 'app/entities/task-finance-app-suffix/service/task-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { JobFinanceAppSuffixService } from '../service/job-finance-app-suffix.service';
import { IJobFinanceAppSuffix } from '../job-finance-app-suffix.model';
import { JobFinanceAppSuffixFormGroup, JobFinanceAppSuffixFormService } from './job-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-job-finance-app-suffix-update',
  templateUrl: './job-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class JobFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  job: IJobFinanceAppSuffix | null = null;

  tasksSharedCollection: ITaskFinanceAppSuffix[] = [];
  employeesSharedCollection: IEmployeeFinanceAppSuffix[] = [];

  protected jobService = inject(JobFinanceAppSuffixService);
  protected jobFormService = inject(JobFinanceAppSuffixFormService);
  protected taskService = inject(TaskFinanceAppSuffixService);
  protected employeeService = inject(EmployeeFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: JobFinanceAppSuffixFormGroup = this.jobFormService.createJobFinanceAppSuffixFormGroup();

  compareTaskFinanceAppSuffix = (o1: ITaskFinanceAppSuffix | null, o2: ITaskFinanceAppSuffix | null): boolean =>
    this.taskService.compareTaskFinanceAppSuffix(o1, o2);

  compareEmployeeFinanceAppSuffix = (o1: IEmployeeFinanceAppSuffix | null, o2: IEmployeeFinanceAppSuffix | null): boolean =>
    this.employeeService.compareEmployeeFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
      if (job) {
        this.updateForm(job);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.jobFormService.getJobFinanceAppSuffix(this.editForm);
    if (job.id !== null) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobFinanceAppSuffix>>): void {
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

  protected updateForm(job: IJobFinanceAppSuffix): void {
    this.job = job;
    this.jobFormService.resetForm(this.editForm, job);

    this.tasksSharedCollection = this.taskService.addTaskFinanceAppSuffixToCollectionIfMissing<ITaskFinanceAppSuffix>(
      this.tasksSharedCollection,
      ...(job.tasks ?? []),
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
      this.employeesSharedCollection,
      job.employee,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITaskFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((tasks: ITaskFinanceAppSuffix[]) =>
          this.taskService.addTaskFinanceAppSuffixToCollectionIfMissing<ITaskFinanceAppSuffix>(tasks, ...(this.job?.tasks ?? [])),
        ),
      )
      .subscribe((tasks: ITaskFinanceAppSuffix[]) => (this.tasksSharedCollection = tasks));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeeFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeFinanceAppSuffix[]) =>
          this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(employees, this.job?.employee),
        ),
      )
      .subscribe((employees: IEmployeeFinanceAppSuffix[]) => (this.employeesSharedCollection = employees));
  }
}
