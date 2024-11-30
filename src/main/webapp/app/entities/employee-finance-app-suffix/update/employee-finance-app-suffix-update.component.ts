import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from 'app/entities/department-finance-app-suffix/service/department-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from '../service/employee-finance-app-suffix.service';
import { EmployeeFinanceAppSuffixFormGroup, EmployeeFinanceAppSuffixFormService } from './employee-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-employee-finance-app-suffix-update',
  templateUrl: './employee-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EmployeeFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  employee: IEmployeeFinanceAppSuffix | null = null;

  employeesSharedCollection: IEmployeeFinanceAppSuffix[] = [];
  departmentsSharedCollection: IDepartmentFinanceAppSuffix[] = [];

  protected employeeService = inject(EmployeeFinanceAppSuffixService);
  protected employeeFormService = inject(EmployeeFinanceAppSuffixFormService);
  protected departmentService = inject(DepartmentFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: EmployeeFinanceAppSuffixFormGroup = this.employeeFormService.createEmployeeFinanceAppSuffixFormGroup();

  compareEmployeeFinanceAppSuffix = (o1: IEmployeeFinanceAppSuffix | null, o2: IEmployeeFinanceAppSuffix | null): boolean =>
    this.employeeService.compareEmployeeFinanceAppSuffix(o1, o2);

  compareDepartmentFinanceAppSuffix = (o1: IDepartmentFinanceAppSuffix | null, o2: IDepartmentFinanceAppSuffix | null): boolean =>
    this.departmentService.compareDepartmentFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
      if (employee) {
        this.updateForm(employee);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.employeeFormService.getEmployeeFinanceAppSuffix(this.editForm);
    if (employee.id !== null) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeFinanceAppSuffix>>): void {
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

  protected updateForm(employee: IEmployeeFinanceAppSuffix): void {
    this.employee = employee;
    this.employeeFormService.resetForm(this.editForm, employee);

    this.employeesSharedCollection = this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
      this.employeesSharedCollection,
      employee.manager,
    );
    this.departmentsSharedCollection =
      this.departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing<IDepartmentFinanceAppSuffix>(
        this.departmentsSharedCollection,
        employee.department,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeeFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeFinanceAppSuffix[]) =>
          this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
            employees,
            this.employee?.manager,
          ),
        ),
      )
      .subscribe((employees: IEmployeeFinanceAppSuffix[]) => (this.employeesSharedCollection = employees));

    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartmentFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartmentFinanceAppSuffix[]) =>
          this.departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing<IDepartmentFinanceAppSuffix>(
            departments,
            this.employee?.department,
          ),
        ),
      )
      .subscribe((departments: IDepartmentFinanceAppSuffix[]) => (this.departmentsSharedCollection = departments));
  }
}
