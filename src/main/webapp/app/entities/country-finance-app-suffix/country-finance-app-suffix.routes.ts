import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CountryFinanceAppSuffixResolve from './route/country-finance-app-suffix-routing-resolve.service';

const countryRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/country-finance-app-suffix.component').then(m => m.CountryFinanceAppSuffixComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/country-finance-app-suffix-detail.component').then(m => m.CountryFinanceAppSuffixDetailComponent),
    resolve: {
      country: CountryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/country-finance-app-suffix-update.component').then(m => m.CountryFinanceAppSuffixUpdateComponent),
    resolve: {
      country: CountryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/country-finance-app-suffix-update.component').then(m => m.CountryFinanceAppSuffixUpdateComponent),
    resolve: {
      country: CountryFinanceAppSuffixResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default countryRoute;
