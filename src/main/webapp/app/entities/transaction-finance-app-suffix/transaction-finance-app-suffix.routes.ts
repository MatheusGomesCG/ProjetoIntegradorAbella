import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TransactionFinanceAppSuffixResolve from './route/transaction-finance-app-suffix-routing-resolve.service';

const transactionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/transaction-finance-app-suffix.component').then(m => m.TransactionFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/transaction-finance-app-suffix-detail.component').then(m => m.TransactionFinanceAppSuffixDetailComponent),
    resolve: {
      transaction: TransactionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/transaction-finance-app-suffix-update.component').then(m => m.TransactionFinanceAppSuffixUpdateComponent),
    resolve: {
      transaction: TransactionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/transaction-finance-app-suffix-update.component').then(m => m.TransactionFinanceAppSuffixUpdateComponent),
    resolve: {
      transaction: TransactionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default transactionRoute;
