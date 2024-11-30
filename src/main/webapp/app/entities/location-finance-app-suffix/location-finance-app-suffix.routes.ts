import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import LocationFinanceAppSuffixResolve from './route/location-finance-app-suffix-routing-resolve.service';

const locationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/location-finance-app-suffix.component').then(m => m.LocationFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/location-finance-app-suffix-detail.component').then(m => m.LocationFinanceAppSuffixDetailComponent),
    resolve: {
      location: LocationFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/location-finance-app-suffix-update.component').then(m => m.LocationFinanceAppSuffixUpdateComponent),
    resolve: {
      location: LocationFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/location-finance-app-suffix-update.component').then(m => m.LocationFinanceAppSuffixUpdateComponent),
    resolve: {
      location: LocationFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default locationRoute;
