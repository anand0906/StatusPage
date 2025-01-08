import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages').then((p) => p.UserComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components').then((p) => p.HomeComponent),
      },
    ],
  },
];
