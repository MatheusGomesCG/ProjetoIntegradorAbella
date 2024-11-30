import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILocationFinanceAppSuffix } from 'app/entities/location-finance-app-suffix/location-finance-app-suffix.model';
import { LocationFinanceAppSuffixService } from 'app/entities/location-finance-app-suffix/service/location-finance-app-suffix.service';
import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from '../service/department-finance-app-suffix.service';
import { DepartmentFinanceAppSuffixFormGroup, DepartmentFinanceAppSuffixFormService } from './department-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-department-finance-app-suffix-update',
  templateUrl: './department-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DepartmentFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  department: IDepartmentFinanceAppSuffix | null = null;

  locationsCollection: ILocationFinanceAppSuffix[] = [];

  protected departmentService = inject(DepartmentFinanceAppSuffixService);
  protected departmentFormService = inject(DepartmentFinanceAppSuffixFormService);
  protected locationService = inject(LocationFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DepartmentFinanceAppSuffixFormGroup = this.departmentFormService.createDepartmentFinanceAppSuffixFormGroup();

  compareLocationFinanceAppSuffix = (o1: ILocationFinanceAppSuffix | null, o2: ILocationFinanceAppSuffix | null): boolean =>
    this.locationService.compareLocationFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      if (department) {
        this.updateForm(department);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.departmentFormService.getDepartmentFinanceAppSuffix(this.editForm);
    if (department.id !== null) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentFinanceAppSuffix>>): void {
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

  protected updateForm(department: IDepartmentFinanceAppSuffix): void {
    this.department = department;
    this.departmentFormService.resetForm(this.editForm, department);

    this.locationsCollection = this.locationService.addLocationFinanceAppSuffixToCollectionIfMissing<ILocationFinanceAppSuffix>(
      this.locationsCollection,
      department.location,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.locationService
      .query({ filter: 'department-is-null' })
      .pipe(map((res: HttpResponse<ILocationFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocationFinanceAppSuffix[]) =>
          this.locationService.addLocationFinanceAppSuffixToCollectionIfMissing<ILocationFinanceAppSuffix>(
            locations,
            this.department?.location,
          ),
        ),
      )
      .subscribe((locations: ILocationFinanceAppSuffix[]) => (this.locationsCollection = locations));
  }
}
