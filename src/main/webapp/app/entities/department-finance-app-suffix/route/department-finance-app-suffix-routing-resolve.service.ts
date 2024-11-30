import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from '../service/department-finance-app-suffix.service';

const departmentResolve = (route: ActivatedRouteSnapshot): Observable<null | IDepartmentFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(DepartmentFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((department: HttpResponse<IDepartmentFinanceAppSuffix>) => {
          if (department.body) {
            return of(department.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default departmentResolve;
