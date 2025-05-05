import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-organizer-signup',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	templateUrl: './organizer-signup.component.html',
	styleUrl: './organizer-signup.component.css',
})
export class OrganizerSignupComponent {
	organizerForm = new FormGroup({
		fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		contactNumber: new FormControl('', [
			Validators.required,
			Validators.pattern(/^\d{10}$/), // 10-digit phone number validation
		]),
		email: new FormControl('', [Validators.required, Validators.email]),
		district: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	constructor(private router: Router, private snackBar: MatSnackBar) {}

	onSubmit() {
		if (this.organizerForm.valid) {
			const organizer = this.organizerForm.value;
			const users = JSON.parse(localStorage.getItem('users') || '[]');

			users.push({
				username: organizer.email,
				fullName: organizer.fullName,
				password: organizer.password,
				role: 'organizer',
			});

			localStorage.setItem('users', JSON.stringify(users));

			this.snackBar.open('Organizer account created successfully! ✅', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});

			this.router.navigate(['/login']);
		}
	}
}
