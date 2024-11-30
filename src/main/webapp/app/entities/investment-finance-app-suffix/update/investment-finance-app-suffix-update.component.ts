import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from 'app/entities/account-user-finance-app-suffix/service/account-user-finance-app-suffix.service';
import { InvestmentType } from 'app/entities/enumerations/investment-type.model';
import { InvestmentFinanceAppSuffixService } from '../service/investment-finance-app-suffix.service';
import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import { InvestmentFinanceAppSuffixFormGroup, InvestmentFinanceAppSuffixFormService } from './investment-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-investment-finance-app-suffix-update',
  templateUrl: './investment-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class InvestmentFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  investment: IInvestmentFinanceAppSuffix | null = null;
  investmentTypeValues = Object.keys(InvestmentType);

  accountUsersSharedCollection: IAccountUserFinanceAppSuffix[] = [];

  protected investmentService = inject(InvestmentFinanceAppSuffixService);
  protected investmentFormService = inject(InvestmentFinanceAppSuffixFormService);
  protected accountUserService = inject(AccountUserFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: InvestmentFinanceAppSuffixFormGroup = this.investmentFormService.createInvestmentFinanceAppSuffixFormGroup();

  compareAccountUserFinanceAppSuffix = (o1: IAccountUserFinanceAppSuffix | null, o2: IAccountUserFinanceAppSuffix | null): boolean =>
    this.accountUserService.compareAccountUserFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ investment }) => {
      this.investment = investment;
      if (investment) {
        this.updateForm(investment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const investment = this.investmentFormService.getInvestmentFinanceAppSuffix(this.editForm);
    if (investment.id !== null) {
      this.subscribeToSaveResponse(this.investmentService.update(investment));
    } else {
      this.subscribeToSaveResponse(this.investmentService.create(investment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvestmentFinanceAppSuffix>>): void {
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

  protected updateForm(investment: IInvestmentFinanceAppSuffix): void {
    this.investment = investment;
    this.investmentFormService.resetForm(this.editForm, investment);

    this.accountUsersSharedCollection =
      this.accountUserService.addAccountUserFinanceAppSuffixToCollectionIfMissing<IAccountUserFinanceAppSuffix>(
        this.accountUsersSharedCollection,
        investment.account,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.accountUserService
      .query()
      .pipe(map((res: HttpResponse<IAccountUserFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((accountUsers: IAccountUserFinanceAppSuffix[]) =>
          this.accountUserService.addAccountUserFinanceAppSuffixToCollectionIfMissing<IAccountUserFinanceAppSuffix>(
            accountUsers,
            this.investment?.account,
          ),
        ),
      )
      .subscribe((accountUsers: IAccountUserFinanceAppSuffix[]) => (this.accountUsersSharedCollection = accountUsers));
  }
}
