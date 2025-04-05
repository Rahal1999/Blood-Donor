import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userRole: 'donor' | 'organizer' | null = null;

	// Simulate login (In real-world apps, fetch user role from API)
	login(role: 'donor' | 'organizer') {
		this.userRole = role;
		localStorage.setItem('userRole', role); // Store in local storage
	}

	// Get user role from localStorage or session
	getUserRole(): 'donor' | 'organizer' {
		this.userRole = (localStorage.getItem('userRole') as 'donor' | 'organizer') || 'donor';

		console.log(this.userRole);
		return this.userRole;
	}

	// Logout the user
	logout() {
		this.userRole = null;
		localStorage.removeItem('userRole');
	}
}
