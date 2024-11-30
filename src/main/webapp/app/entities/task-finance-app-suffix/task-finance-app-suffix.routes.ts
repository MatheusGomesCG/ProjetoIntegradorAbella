import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TaskFinanceAppSuffixResolve from './route/task-finance-app-suffix-routing-resolve.service';

const taskRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/task-finance-app-suffix.component').then(m => m.TaskFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/task-finance-app-suffix-detail.component').then(m => m.TaskFinanceAppSuffixDetailComponent),
    resolve: {
      task: TaskFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/task-finance-app-suffix-update.component').then(m => m.TaskFinanceAppSuffixUpdateComponent),
    resolve: {
      task: TaskFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/task-finance-app-suffix-update.component').then(m => m.TaskFinanceAppSuffixUpdateComponent),
    resolve: {
      task: TaskFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default taskRoute;
