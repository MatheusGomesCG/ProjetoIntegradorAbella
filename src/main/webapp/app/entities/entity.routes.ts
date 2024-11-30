import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'serviceApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'account-user-finance-app-suffix',
    data: { pageTitle: 'serviceApp.accountUser.home.title' },
    loadChildren: () => import('./account-user-finance-app-suffix/account-user-finance-app-suffix.routes'),
  },
  {
    path: 'country-finance-app-suffix',
    data: { pageTitle: 'serviceApp.country.home.title' },
    loadChildren: () => import('./country-finance-app-suffix/country-finance-app-suffix.routes'),
  },
  {
    path: 'department-finance-app-suffix',
    data: { pageTitle: 'serviceApp.department.home.title' },
    loadChildren: () => import('./department-finance-app-suffix/department-finance-app-suffix.routes'),
  },
  {
    path: 'employee-finance-app-suffix',
    data: { pageTitle: 'serviceApp.employee.home.title' },
    loadChildren: () => import('./employee-finance-app-suffix/employee-finance-app-suffix.routes'),
  },
  {
    path: 'investment-finance-app-suffix',
    data: { pageTitle: 'serviceApp.investment.home.title' },
    loadChildren: () => import('./investment-finance-app-suffix/investment-finance-app-suffix.routes'),
  },
  {
    path: 'job-finance-app-suffix',
    data: { pageTitle: 'serviceApp.job.home.title' },
    loadChildren: () => import('./job-finance-app-suffix/job-finance-app-suffix.routes'),
  },
  {
    path: 'job-history-finance-app-suffix',
    data: { pageTitle: 'serviceApp.jobHistory.home.title' },
    loadChildren: () => import('./job-history-finance-app-suffix/job-history-finance-app-suffix.routes'),
  },
  {
    path: 'location-finance-app-suffix',
    data: { pageTitle: 'serviceApp.location.home.title' },
    loadChildren: () => import('./location-finance-app-suffix/location-finance-app-suffix.routes'),
  },
  {
    path: 'region-finance-app-suffix',
    data: { pageTitle: 'serviceApp.region.home.title' },
    loadChildren: () => import('./region-finance-app-suffix/region-finance-app-suffix.routes'),
  },
  {
    path: 'task-finance-app-suffix',
    data: { pageTitle: 'serviceApp.task.home.title' },
    loadChildren: () => import('./task-finance-app-suffix/task-finance-app-suffix.routes'),
  },
  {
    path: 'transaction-finance-app-suffix',
    data: { pageTitle: 'serviceApp.transaction.home.title' },
    loadChildren: () => import('./transaction-finance-app-suffix/transaction-finance-app-suffix.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
