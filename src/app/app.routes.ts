import { Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { PublishedCampsComponent } from './pages/published-camps/published-camps.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
	{
		path: 'settings',
		component: SettingsComponent
	},
	{
		path: 'published-camps',
		loadComponent: () => import('./pages/published-camps/published-camps.component').then(m => m.PublishedCampsComponent)
	},

	{
		path: 'published-camps',
		component: PublishedCampsComponent,
	},

	{
		path: 'profile',
		component: ProfileComponent,
	},
	  
	  
	  
	  
];
