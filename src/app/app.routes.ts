import { Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { PublishedCampsComponent } from './pages/published-camps/published-camps.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommunityComponent } from './pages/community/community.component';
import { DonorSignupComponent } from './pages/donor-signup/donor-signup.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizerSignupComponent } from './pages/organizer-signup/organizer-signup.component';

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

	{ path: '', component: LoginComponent },
	{ path: 'donor-signup', component: DonorSignupComponent },

	{
		path: 'login',
		loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
	},
	{ path: 'organizer-signup', component: OrganizerSignupComponent },
];
