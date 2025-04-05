import { Routes } from '@angular/router';

export const routes: Routes = [

	{
		path: '',
		loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
		loadChildren: () => import('./pages/dashboard.routes').then((r) => r.dashboardRoutes),
	},
    {
		path: 'sign-up',
		loadComponent: () => import('./pages/sign-up/sign-up.component').then((c) => c.SignUpComponent),
	},
	 {
		path: 'login',
		loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
	},
];
