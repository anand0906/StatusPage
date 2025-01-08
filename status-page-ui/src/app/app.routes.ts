import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user').then((p) => p.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin').then((p) => p.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
