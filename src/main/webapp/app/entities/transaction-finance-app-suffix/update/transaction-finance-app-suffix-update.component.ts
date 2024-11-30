import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from 'app/entities/account-user-finance-app-suffix/service/account-user-finance-app-suffix.service';
import { TransactionType } from 'app/entities/enumerations/transaction-type.model';
import { TransactionFinanceAppSuffixService } from '../service/transaction-finance-app-suffix.service';
import { ITransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';
import {
  TransactionFinanceAppSuffixFormGroup,
  TransactionFinanceAppSuffixFormService,
} from './transaction-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-transaction-finance-app-suffix-update',
  templateUrl: './transaction-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TransactionFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  transaction: ITransactionFinanceAppSuffix | null = null;
  transactionTypeValues = Object.keys(TransactionType);

  accountUsersSharedCollection: IAccountUserFinanceAppSuffix[] = [];

  protected transactionService = inject(TransactionFinanceAppSuffixService);
  protected transactionFormService = inject(TransactionFinanceAppSuffixFormService);
  protected accountUserService = inject(AccountUserFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TransactionFinanceAppSuffixFormGroup = this.transactionFormService.createTransactionFinanceAppSuffixFormGroup();

  compareAccountUserFinanceAppSuffix = (o1: IAccountUserFinanceAppSuffix | null, o2: IAccountUserFinanceAppSuffix | null): boolean =>
    this.accountUserService.compareAccountUserFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transaction }) => {
      this.transaction = transaction;
      if (transaction) {
        this.updateForm(transaction);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transaction = this.transactionFormService.getTransactionFinanceAppSuffix(this.editForm);
    if (transaction.id !== null) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionFinanceAppSuffix>>): void {
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

  protected updateForm(transaction: ITransactionFinanceAppSuffix): void {
    this.transaction = transaction;
    this.transactionFormService.resetForm(this.editForm, transaction);

    this.accountUsersSharedCollection =
      this.accountUserService.addAccountUserFinanceAppSuffixToCollectionIfMissing<IAccountUserFinanceAppSuffix>(
        this.accountUsersSharedCollection,
        transaction.account,
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
            this.transaction?.account,
          ),
        ),
      )
      .subscribe((accountUsers: IAccountUserFinanceAppSuffix[]) => (this.accountUsersSharedCollection = accountUsers));
  }
}
