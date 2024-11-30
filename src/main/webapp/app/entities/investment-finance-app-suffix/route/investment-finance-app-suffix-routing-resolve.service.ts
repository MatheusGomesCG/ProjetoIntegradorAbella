import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import { InvestmentFinanceAppSuffixService } from '../service/investment-finance-app-suffix.service';

const investmentResolve = (route: ActivatedRouteSnapshot): Observable<null | IInvestmentFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(InvestmentFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((investment: HttpResponse<IInvestmentFinanceAppSuffix>) => {
          if (investment.body) {
            return of(investment.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default investmentResolve;
