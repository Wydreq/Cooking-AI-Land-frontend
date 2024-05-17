import { Routes } from '@angular/router';
import { loggedInGuard } from './core/guards/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'auth',
    canActivate: [loggedInGuard],
    loadComponent: () =>
      import('./auth/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    path: 'cookbooks',
    loadChildren: () => import('./cookbooks/cookbooks.routes').then(m => m.COOKBOOKS_ROUTES)
  }
];
