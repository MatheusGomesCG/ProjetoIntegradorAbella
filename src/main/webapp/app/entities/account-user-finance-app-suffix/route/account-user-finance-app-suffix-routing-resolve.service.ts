import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from '../service/account-user-finance-app-suffix.service';

const accountUserResolve = (route: ActivatedRouteSnapshot): Observable<null | IAccountUserFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(AccountUserFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((accountUser: HttpResponse<IAccountUserFinanceAppSuffix>) => {
          if (accountUser.body) {
            return of(accountUser.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default accountUserResolve;
