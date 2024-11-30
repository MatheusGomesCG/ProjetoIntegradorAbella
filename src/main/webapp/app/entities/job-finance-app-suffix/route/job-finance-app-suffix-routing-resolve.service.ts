import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobFinanceAppSuffix } from '../job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from '../service/job-finance-app-suffix.service';

const jobResolve = (route: ActivatedRouteSnapshot): Observable<null | IJobFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(JobFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((job: HttpResponse<IJobFinanceAppSuffix>) => {
          if (job.body) {
            return of(job.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default jobResolve;
