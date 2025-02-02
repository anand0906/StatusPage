import { Routes } from '@angular/router';
import { authGuard } from './shared';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user').then((p) => p.routes),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin').then((p) => p.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
