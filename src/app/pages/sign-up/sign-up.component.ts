import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatIconModule],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
	form: FormGroup;

	constructor(private fb: FormBuilder, private router: Router) {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			address: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			nic: ['', [Validators.required]],
			bloodGroup: ['', [Validators.required]],
			dob: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		if (this.form.invalid) return;

		console.log('Donor Registered:', this.form.value);
		alert('Sign-up Successful! ✅');

		this.router.navigate(['/home']);
		this.form.reset();
	}
}
