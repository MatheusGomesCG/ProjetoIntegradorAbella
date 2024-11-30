import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from 'app/entities/job-finance-app-suffix/service/job-finance-app-suffix.service';
import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from 'app/entities/department-finance-app-suffix/service/department-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { Language } from 'app/entities/enumerations/language.model';
import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';
import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import { JobHistoryFinanceAppSuffixFormGroup, JobHistoryFinanceAppSuffixFormService } from './job-history-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-job-history-finance-app-suffix-update',
  templateUrl: './job-history-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class JobHistoryFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  jobHistory: IJobHistoryFinanceAppSuffix | null = null;
  languageValues = Object.keys(Language);

  jobsCollection: IJobFinanceAppSuffix[] = [];
  departmentsCollection: IDepartmentFinanceAppSuffix[] = [];
  employeesCollection: IEmployeeFinanceAppSuffix[] = [];

  protected jobHistoryService = inject(JobHistoryFinanceAppSuffixService);
  protected jobHistoryFormService = inject(JobHistoryFinanceAppSuffixFormService);
  protected jobService = inject(JobFinanceAppSuffixService);
  protected departmentService = inject(DepartmentFinanceAppSuffixService);
  protected employeeService = inject(EmployeeFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: JobHistoryFinanceAppSuffixFormGroup = this.jobHistoryFormService.createJobHistoryFinanceAppSuffixFormGroup();

  compareJobFinanceAppSuffix = (o1: IJobFinanceAppSuffix | null, o2: IJobFinanceAppSuffix | null): boolean =>
    this.jobService.compareJobFinanceAppSuffix(o1, o2);

  compareDepartmentFinanceAppSuffix = (o1: IDepartmentFinanceAppSuffix | null, o2: IDepartmentFinanceAppSuffix | null): boolean =>
    this.departmentService.compareDepartmentFinanceAppSuffix(o1, o2);

  compareEmployeeFinanceAppSuffix = (o1: IEmployeeFinanceAppSuffix | null, o2: IEmployeeFinanceAppSuffix | null): boolean =>
    this.employeeService.compareEmployeeFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.jobHistory = jobHistory;
      if (jobHistory) {
        this.updateForm(jobHistory);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.jobHistoryFormService.getJobHistoryFinanceAppSuffix(this.editForm);
    if (jobHistory.id !== null) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryFinanceAppSuffix>>): void {
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

  protected updateForm(jobHistory: IJobHistoryFinanceAppSuffix): void {
    this.jobHistory = jobHistory;
    this.jobHistoryFormService.resetForm(this.editForm, jobHistory);

    this.jobsCollection = this.jobService.addJobFinanceAppSuffixToCollectionIfMissing<IJobFinanceAppSuffix>(
      this.jobsCollection,
      jobHistory.job,
    );
    this.departmentsCollection = this.departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing<IDepartmentFinanceAppSuffix>(
      this.departmentsCollection,
      jobHistory.department,
    );
    this.employeesCollection = this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
      this.employeesCollection,
      jobHistory.employee,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IJobFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((jobs: IJobFinanceAppSuffix[]) =>
          this.jobService.addJobFinanceAppSuffixToCollectionIfMissing<IJobFinanceAppSuffix>(jobs, this.jobHistory?.job),
        ),
      )
      .subscribe((jobs: IJobFinanceAppSuffix[]) => (this.jobsCollection = jobs));

    this.departmentService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IDepartmentFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartmentFinanceAppSuffix[]) =>
          this.departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing<IDepartmentFinanceAppSuffix>(
            departments,
            this.jobHistory?.department,
          ),
        ),
      )
      .subscribe((departments: IDepartmentFinanceAppSuffix[]) => (this.departmentsCollection = departments));

    this.employeeService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IEmployeeFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeFinanceAppSuffix[]) =>
          this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
            employees,
            this.jobHistory?.employee,
          ),
        ),
      )
      .subscribe((employees: IEmployeeFinanceAppSuffix[]) => (this.employeesCollection = employees));
  }
}
