import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DepartmentFinanceAppSuffixResolve from './route/department-finance-app-suffix-routing-resolve.service';

const departmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/department-finance-app-suffix.component').then(m => m.DepartmentFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/department-finance-app-suffix-detail.component').then(m => m.DepartmentFinanceAppSuffixDetailComponent),
    resolve: {
      department: DepartmentFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/department-finance-app-suffix-update.component').then(m => m.DepartmentFinanceAppSuffixUpdateComponent),
    resolve: {
      department: DepartmentFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/department-finance-app-suffix-update.component').then(m => m.DepartmentFinanceAppSuffixUpdateComponent),
    resolve: {
      department: DepartmentFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default departmentRoute;
