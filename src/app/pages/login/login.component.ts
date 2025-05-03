import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	constructor(private router: Router, private snackBar: MatSnackBar) {
		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});
	}

	// Dummy users
	users = [
		{ username: 'donor1', password: 'donor123', role: 'donor' },
		{ username: 'organizer1', password: 'organizer123', role: 'organizer' },
	];

	camps: any[] = [
		{
			title: 'Camp Details',
			location: 'IIT',
			date: '04th February 2024',
			time: '10:30 AM onwards',
			slots: 10,
			bloodGroups: ['A+', 'B+', 'O-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'City Hospital',
			date: '10th February 2024',
			time: '11:00 AM onwards',
			slots: 5,
			bloodGroups: ['A-', 'O+', 'B-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Community Center',
			date: '15th February 2024',
			time: '9:00 AM onwards',
			slots: 12,
			bloodGroups: ['AB+', 'O+', 'A+'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Red Cross Society',
			date: '20th February 2024',
			time: '10:00 AM onwards',
			slots: 8,
			bloodGroups: ['B+', 'O+', 'AB-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Health Hub',
			date: '25th February 2024',
			time: '1:00 PM onwards',
			slots: 15,
			bloodGroups: ['A+', 'AB+', 'O-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Govt. Hospital',
			date: '28th February 2024',
			time: '10:00 AM onwards',
			slots: 6,
			bloodGroups: ['O+', 'A-', 'B-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Wellness Center',
			date: '02nd March 2024',
			time: '2:00 PM onwards',
			slots: 10,
			bloodGroups: ['A+', 'B+', 'O+'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Blood Bank',
			date: '05th March 2024',
			time: '12:00 PM onwards',
			slots: 7,
			bloodGroups: ['O+', 'A+', 'AB-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'University Clinic',
			date: '10th March 2024',
			time: '9:30 AM onwards',
			slots: 9,
			bloodGroups: ['A-', 'B-', 'O-'],
			user: 'Evin',
		},
		{
			title: 'Camp Details',
			location: 'Mega Health Camp',
			date: '15th March 2024',
			time: '11:30 AM onwards',
			slots: 20,
			bloodGroups: ['A+', 'O+', 'AB+'],
			user: 'Evin',
		},
	];

	loginForm: FormGroup;

	onSignUp(role: 'donor' | 'organizer') {
		if (role === 'donor') {
			this.router.navigate(['/donor-signup']);
		} else if (role === 'organizer') {
			this.router.navigate(['/organizer-signup']);
		}
	}

	login() {
		const { username, password } = this.loginForm.value;

		const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
		const allUsers = [...this.users, ...localUsers];

		const user = allUsers.find((user) => user.username === username && user.password === password);

		if (user) {
			// Store user's information in localStorage
			localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the entire user object

			localStorage.setItem('userRole', user.role);
			//localStorage.setItem('publishedCamps', JSON.stringify(this.camps));

			this.router.navigate(['/home']);
			this.snackBar.open('Login successful ✅', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});
		} else {
			this.snackBar.open('Invalid credentials', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});
		}
	}
}
