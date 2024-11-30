import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';
import { TaskFinanceAppSuffixService } from '../service/task-finance-app-suffix.service';

const taskResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaskFinanceAppSuffix> => {
  const id = route.params.id;
  if (id) {
    return inject(TaskFinanceAppSuffixService)
      .find(id)
      .pipe(
        mergeMap((task: HttpResponse<ITaskFinanceAppSuffix>) => {
          if (task.body) {
            return of(task.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default taskResolve;
