import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages').then((p) => p.AdminComponent),
    children: [
      {
        path: 'incidents',
        loadComponent: () =>
          import('./components').then((p) => p.IncidentPageComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components').then((p) => p.ServicePageComponent),
      },
    ],
  },
];
