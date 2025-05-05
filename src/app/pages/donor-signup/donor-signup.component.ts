import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
	selector: 'app-donor-signup',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
	templateUrl: './donor-signup.component.html',
	styleUrl: './donor-signup.component.css',
})
export class DonorSignupComponent implements OnInit {
	donorForm!: FormGroup;
	bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

	constructor(private router: Router, private snackBar: MatSnackBar) {}

	//adding validation checkers for donor forms
	ngOnInit() {
		this.donorForm = new FormGroup({
			fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
			address: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			nic: new FormControl('', [
				Validators.required,
				Validators.pattern(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/), // supports old & new NIC formats
			]),
			bloodGroup: new FormControl('', Validators.required),
			dob: new FormControl('', Validators.required),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		});

		this.donorForm.get('bloodGroup')?.valueChanges.subscribe((val) => {
			console.log('Selected blood group:', val);
		});
	}

	onSubmit() { // Check if the donor registration form is valid
		if (this.donorForm.valid) {
			const formValue = this.donorForm.value;

			// Retrieve existing users from localStorage (or initialize an empty array if none exist)
			const users = JSON.parse(localStorage.getItem('users') || '[]');
			users.push({
				username: formValue.email,
				password: formValue.password,
				role: 'donor',
				...formValue,
			});
			localStorage.setItem('users', JSON.stringify(users)); // Save the updated users list back to localStorage

			this.snackBar.open('Donor registered successfully! ✅', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});

			this.router.navigate(['/login']);
		} else {
			this.snackBar.open('Form is invalid!', '', {
				duration: 3000,
			});
		}
	}
}
