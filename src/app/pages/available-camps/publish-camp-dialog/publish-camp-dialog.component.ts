import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-publish-camp-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	templateUrl: './publish-camp-dialog.component.html',
	styleUrl: './publish-camp-dialog.component.css',
})
export class PublishCampDialogComponent {
	campForm: FormGroup;
	loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

	constructor(private dialogRef: MatDialogRef<PublishCampDialogComponent>, private fb: FormBuilder, private snackBar: MatSnackBar) {
		this.campForm = this.fb.group({
			organizerName: [this.loggedUser.fullName, Validators.required],
			location: ['', Validators.required],
			date: ['', Validators.required],
			district: ['', Validators.required],
			city: ['', Validators.required],
			Time: ['', Validators.required],
			slots: [null, [Validators.required, Validators.min(1)]],
			bloodGroups: [[], Validators.required],
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		if (this.campForm.valid) {
			const campDetails = this.campForm.value;
			campDetails.user = this.loggedUser.fullName;

			// ✅ Add unique ID
			campDetails.id = 'camp_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

			// Store in localStorage for existing camps
			const existingCamps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
			existingCamps.unshift(campDetails);
			localStorage.setItem('publishedCamps', JSON.stringify(existingCamps));

			// Store in localStorage for the organiser
			const orgNotification = JSON.parse(localStorage.getItem('notifications_organizer') || '[]');
			let notification = {
				message: `✅ Your camp at ${campDetails.location}, ${campDetails.city} has been published successfully.`,
				time: new Date().toLocaleString(),
				user: this.loggedUser.fullName,
			};

			orgNotification.unshift(notification);
			localStorage.setItem('notifications_organizer', JSON.stringify(orgNotification));

			// Store in localStorage for the doners
			const donorNotification = JSON.parse(localStorage.getItem('notifications_donor') || '[]');
			let notificationDonor = {
				message: `🩸 New blood donation camp at ${campDetails.location}, ${campDetails.city} on ${campDetails.date} for blood groups ${
					this.campForm.get('bloodGroups')?.value
				}`,
				time: new Date().toLocaleString(),
				user: this.loggedUser.fullName,
				isNewCamp: true,
			};

			donorNotification.unshift(notificationDonor);
			localStorage.setItem('notifications_donor', JSON.stringify(donorNotification));

			this.snackBar.open('New camp published! ✅', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});

			// Close dialog
			this.dialogRef.close(campDetails);
		} else {
			this.snackBar.open('Invalid details!', '', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});
		}
	}
}
