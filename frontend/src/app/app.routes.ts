import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { donorGuard, receiverGuard, adminGuard } from './core/guards/role.guards';

export const routes: Routes = [
  // Landing page
  {
    path: '',
    loadComponent: () => import('./features/auth/pages/landing/landing.component').then(m => m.LandingComponent)
  },

  // Auth routes
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/google/callback',
    loadComponent: () => import('./features/auth/pages/google-callback/google-callback.component').then(m => m.GoogleCallbackComponent)
  },

  // Donor routes
  {
    path: 'donor',
    canActivate: [authGuard, donorGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/donor/pages/dashboard/dashboard.component').then(m => m.DonorDashboardComponent)
      },
      {
        path: 'add-food',
        loadComponent: () => import('./features/donor/pages/add-food/add-food.component').then(m => m.AddFoodComponent)
      },
      {
        path: 'my-foods',
        loadComponent: () => import('./features/donor/pages/my-foods/my-foods.component').then(m => m.MyFoodsComponent)
      }
    ]
  },

  // Receiver routes
  {
    path: 'receiver',
    canActivate: [authGuard, receiverGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/receiver/pages/dashboard/dashboard.component').then(m => m.ReceiverDashboardComponent)
      },
      {
        path: 'browse-food',
        loadComponent: () => import('./features/receiver/pages/browse-food/browse-food.component').then(m => m.BrowseFoodComponent)
      },
      {
        path: 'my-claims',
        loadComponent: () => import('./features/receiver/pages/my-claims/my-claims.component').then(m => m.MyClaimsComponent)
      }
    ]
  },

  // Admin routes
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/pages/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/admin/pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'fraud',
        loadComponent: () => import('./features/admin/pages/fraud/fraud.component').then(m => m.FraudComponent)
      }
    ]
  },

  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
