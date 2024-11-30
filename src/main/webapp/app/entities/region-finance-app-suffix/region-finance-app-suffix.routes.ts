import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import RegionFinanceAppSuffixResolve from './route/region-finance-app-suffix-routing-resolve.service';

const regionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/region-finance-app-suffix.component').then(m => m.RegionFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/region-finance-app-suffix-detail.component').then(m => m.RegionFinanceAppSuffixDetailComponent),
    resolve: {
      region: RegionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/region-finance-app-suffix-update.component').then(m => m.RegionFinanceAppSuffixUpdateComponent),
    resolve: {
      region: RegionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/region-finance-app-suffix-update.component').then(m => m.RegionFinanceAppSuffixUpdateComponent),
    resolve: {
      region: RegionFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default regionRoute;
