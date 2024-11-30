import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';
import { TransactionFinanceAppSuffixService } from '../service/transaction-finance-app-suffix.service';

const transactionResolve = (route: ActivatedRouteSnapshot): Observable<null | ITransactionFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(TransactionFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((transaction: HttpResponse<ITransactionFinanceAppSuffix>) => {
          if (transaction.body) {
            return of(transaction.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default transactionResolve;
