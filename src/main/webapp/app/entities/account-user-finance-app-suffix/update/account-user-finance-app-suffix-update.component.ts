import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { AccountType } from 'app/entities/enumerations/account-type.model';
import { AccountStatus } from 'app/entities/enumerations/account-status.model';
import { AccountUserFinanceAppSuffixService } from '../service/account-user-finance-app-suffix.service';
import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';
import {
  AccountUserFinanceAppSuffixFormGroup,
  AccountUserFinanceAppSuffixFormService,
} from './account-user-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-account-user-finance-app-suffix-update',
  templateUrl: './account-user-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AccountUserFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  accountUser: IAccountUserFinanceAppSuffix | null = null;
  accountTypeValues = Object.keys(AccountType);
  accountStatusValues = Object.keys(AccountStatus);

  employeesSharedCollection: IEmployeeFinanceAppSuffix[] = [];

  protected accountUserService = inject(AccountUserFinanceAppSuffixService);
  protected accountUserFormService = inject(AccountUserFinanceAppSuffixFormService);
  protected employeeService = inject(EmployeeFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AccountUserFinanceAppSuffixFormGroup = this.accountUserFormService.createAccountUserFinanceAppSuffixFormGroup();

  compareEmployeeFinanceAppSuffix = (o1: IEmployeeFinanceAppSuffix | null, o2: IEmployeeFinanceAppSuffix | null): boolean =>
    this.employeeService.compareEmployeeFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountUser }) => {
      this.accountUser = accountUser;
      if (accountUser) {
        this.updateForm(accountUser);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountUser = this.accountUserFormService.getAccountUserFinanceAppSuffix(this.editForm);
    if (accountUser.id !== null) {
      this.subscribeToSaveResponse(this.accountUserService.update(accountUser));
    } else {
      this.subscribeToSaveResponse(this.accountUserService.create(accountUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountUserFinanceAppSuffix>>): void {
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

  protected updateForm(accountUser: IAccountUserFinanceAppSuffix): void {
    this.accountUser = accountUser;
    this.accountUserFormService.resetForm(this.editForm, accountUser);

    this.employeesSharedCollection = this.employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing<IEmployeeFinanceAppSuffix>(
      this.employeesSharedCollection,
      accountUser.owner,
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
            this.accountUser?.owner,
          ),
        ),
      )
      .subscribe((employees: IEmployeeFinanceAppSuffix[]) => (this.employeesSharedCollection = employees));
  }
}
