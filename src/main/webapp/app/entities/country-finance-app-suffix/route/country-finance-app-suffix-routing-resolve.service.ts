import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';
import { CountryFinanceAppSuffixService } from '../service/country-finance-app-suffix.service';

const countryResolve = (route: ActivatedRouteSnapshot): Observable<null | ICountryFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(CountryFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((country: HttpResponse<ICountryFinanceAppSuffix>) => {
          if (country.body) {
            return of(country.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default countryResolve;
