import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';
import { LocationFinanceAppSuffixService } from '../service/location-finance-app-suffix.service';

const locationResolve = (route: ActivatedRouteSnapshot): Observable<null | ILocationFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(LocationFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((location: HttpResponse<ILocationFinanceAppSuffix>) => {
          if (location.body) {
            return of(location.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default locationResolve;
