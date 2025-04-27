import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatIconModule],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
	constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

	currentUser: any;
	editProfileForm!: FormGroup;

	ngOnInit(): void {
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

		this.editProfileForm = this.fb.group({
			fullName: [loggedUser.fullName || '', Validators.required],
			nic: [loggedUser.nic || '', Validators.required],
			address: [loggedUser.address || '', Validators.required],
			dob: [loggedUser.dob || '', Validators.required],
			password: [loggedUser.password || '', Validators.required],
			newPassword: [''],
			confirmPassword: [''],
		});

		this.currentUser = loggedUser;
	}

	goBackToHome() {
		this.router.navigate(['/home']);
	}

	onSubmit() {
		if (this.editProfileForm.invalid) {
			this.editProfileForm.markAllAsTouched();
			return;
		}

		const updatedData = this.editProfileForm.value;

		if (updatedData.newPassword) {
			if (updatedData.newPassword !== updatedData.confirmPassword) {
				const confirmPasswordControl = this.editProfileForm.get('confirmPassword');
				confirmPasswordControl?.setErrors({ mismatch: true });
				confirmPasswordControl?.markAsTouched();

				this.snackBar.open('Passwords mismatch, please check again!', '', {
					duration: 4000,
				});
				return;
			}
		}

		// Update loggedInUser
		localStorage.setItem(
			'loggedInUser',
			JSON.stringify({
				...this.currentUser,
				fullName: updatedData.fullName,
				nic: updatedData.nic,
				address: updatedData.address,
				dob: updatedData.dob,
				password: updatedData.newPassword || this.currentUser.password, // use new password if provided
			})
		);

		// Update in users list
		const users = JSON.parse(localStorage.getItem('users') || '[]');

		const updatedUsers = users.map((user: any) => {
			if (user.username === this.currentUser.username) {
				return {
					...user,
					fullName: updatedData.fullName,
					nic: updatedData.nic,
					address: updatedData.address,
					dob: updatedData.dob,
					password: updatedData.newPassword || user.password, // update password if new password entered
				};
			}
			return user;
		});

		localStorage.setItem('users', JSON.stringify(updatedUsers));

		this.snackBar.open('Profile updated successfully!', '', {
			duration: 4000,
		});

		this.goBackToHome();
	}
}
