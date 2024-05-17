import { Routes } from '@angular/router';
import {authGuard} from "../core/guards/auth.guard";

export const COOKBOOKS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./user-cookbooks-page/user-cookbooks-page.component').then(
        (m) => m.UserCookbooksPageComponent
      ),
  },
];
