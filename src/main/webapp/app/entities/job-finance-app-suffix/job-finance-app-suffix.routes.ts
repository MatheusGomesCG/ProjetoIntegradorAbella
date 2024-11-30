import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import JobFinanceAppSuffixResolve from './route/job-finance-app-suffix-routing-resolve.service';

const jobRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/job-finance-app-suffix.component').then(m => m.JobFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/job-finance-app-suffix-detail.component').then(m => m.JobFinanceAppSuffixDetailComponent),
    resolve: {
      job: JobFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/job-finance-app-suffix-update.component').then(m => m.JobFinanceAppSuffixUpdateComponent),
    resolve: {
      job: JobFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/job-finance-app-suffix-update.component').then(m => m.JobFinanceAppSuffixUpdateComponent),
    resolve: {
      job: JobFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default jobRoute;
