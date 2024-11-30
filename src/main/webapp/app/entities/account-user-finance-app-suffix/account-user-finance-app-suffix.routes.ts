import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AccountUserFinanceAppSuffixResolve from './route/account-user-finance-app-suffix-routing-resolve.service';

const accountUserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/account-user-finance-app-suffix.component').then(m => m.AccountUserFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/account-user-finance-app-suffix-detail.component').then(m => m.AccountUserFinanceAppSuffixDetailComponent),
    resolve: {
      accountUser: AccountUserFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/account-user-finance-app-suffix-update.component').then(m => m.AccountUserFinanceAppSuffixUpdateComponent),
    resolve: {
      accountUser: AccountUserFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/account-user-finance-app-suffix-update.component').then(m => m.AccountUserFinanceAppSuffixUpdateComponent),
    resolve: {
      accountUser: AccountUserFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default accountUserRoute;
