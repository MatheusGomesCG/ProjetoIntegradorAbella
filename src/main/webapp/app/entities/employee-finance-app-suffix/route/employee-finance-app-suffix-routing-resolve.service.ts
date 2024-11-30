import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from '../service/employee-finance-app-suffix.service';

const employeeResolve = (route: ActivatedRouteSnapshot): Observable<null | IEmployeeFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(EmployeeFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((employee: HttpResponse<IEmployeeFinanceAppSuffix>) => {
          if (employee.body) {
            return of(employee.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default employeeResolve;
