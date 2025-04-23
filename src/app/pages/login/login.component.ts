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
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
		});
	}

	// Dummy users
	users = [
		{ username: 'donor1', password: 'donor123', role: 'donor' },
		{ username: 'organizer1', password: 'organizer123', role: 'organizer' },
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
	  
		const user = allUsers.find(user => user.username === username && user.password === password);
	  
		if (user) {

			// Store user's information in localStorage
	    	localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store the entire user object

		  localStorage.setItem('userRole', user.role);
	  
		  this.router.navigate(['/home']);
		  this.snackBar.open('Login successful', '', {
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
