import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import EmployeeFinanceAppSuffixResolve from './route/employee-finance-app-suffix-routing-resolve.service';

const employeeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/employee-finance-app-suffix.component').then(m => m.EmployeeFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/employee-finance-app-suffix-detail.component').then(m => m.EmployeeFinanceAppSuffixDetailComponent),
    resolve: {
      employee: EmployeeFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/employee-finance-app-suffix-update.component').then(m => m.EmployeeFinanceAppSuffixUpdateComponent),
    resolve: {
      employee: EmployeeFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/employee-finance-app-suffix-update.component').then(m => m.EmployeeFinanceAppSuffixUpdateComponent),
    resolve: {
      employee: EmployeeFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default employeeRoute;
