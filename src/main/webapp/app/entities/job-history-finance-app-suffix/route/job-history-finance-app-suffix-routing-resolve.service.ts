import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';

const jobHistoryResolve = (route: ActivatedRouteSnapshot): Observable<null | IJobHistoryFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(JobHistoryFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((jobHistory: HttpResponse<IJobHistoryFinanceAppSuffix>) => {
          if (jobHistory.body) {
            return of(jobHistory.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default jobHistoryResolve;
