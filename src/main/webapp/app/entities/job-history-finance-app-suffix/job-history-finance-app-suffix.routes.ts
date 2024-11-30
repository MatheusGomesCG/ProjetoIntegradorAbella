import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import JobHistoryFinanceAppSuffixResolve from './route/job-history-finance-app-suffix-routing-resolve.service';

const jobHistoryRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/job-history-finance-app-suffix.component').then(m => m.JobHistoryFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/job-history-finance-app-suffix-detail.component').then(m => m.JobHistoryFinanceAppSuffixDetailComponent),
    resolve: {
      jobHistory: JobHistoryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/job-history-finance-app-suffix-update.component').then(m => m.JobHistoryFinanceAppSuffixUpdateComponent),
    resolve: {
      jobHistory: JobHistoryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/job-history-finance-app-suffix-update.component').then(m => m.JobHistoryFinanceAppSuffixUpdateComponent),
    resolve: {
      jobHistory: JobHistoryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default jobHistoryRoute;
