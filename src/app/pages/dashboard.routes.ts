import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
	},
	{
		path: 'available-camps',
		loadComponent: () => import('./available-camps/available-camps.component').then((c) => c.AvailableCampsComponent),
	},
	{
		path: 'after-care',
		loadComponent: () => import('./after-care/after-care.component').then((c) => c.AfterCareComponent),
	},
	{
		path: 'notifications',
		loadComponent: () => import('./notifications/notifications.component').then((c) => c.NotificationsComponent),
	},
	{
		path: 'profile',
		loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
	},
	{
		path: 'community',
		loadComponent: () => import('./community/community.component').then((c) => c.CommunityComponent),
	},
	{
		path: 'settings',
		loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent),
	},
	{
		path: 'published-camps',
		loadComponent: () => import('./published-camps/published-camps.component').then((c) => c.PublishedCampsComponent),
	},
	// test
];
