import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';
import { RegionFinanceAppSuffixService } from '../service/region-finance-app-suffix.service';

const regionResolve = (route: ActivatedRouteSnapshot): Observable<null | IRegionFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(RegionFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((region: HttpResponse<IRegionFinanceAppSuffix>) => {
          if (region.body) {
            return of(region.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default regionResolve;
