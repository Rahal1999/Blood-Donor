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
import { NotificationService } from '../services/notification.service';

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

	constructor(private dialogRef: MatDialogRef<PublishCampDialogComponent>, private fb: FormBuilder, private notificationService: NotificationService) {
		this.campForm = this.fb.group({
			organizerName: ['', Validators.required],
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
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

		if (this.campForm.valid) {
			const campDetails = this.campForm.value;
			campDetails.user = loggedUser.fullName;
	
			// ✅ Add unique ID
			campDetails.id = 'camp_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

			// Store in localStorage
			const existingCamps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
			existingCamps.push(campDetails);
			localStorage.setItem('publishedCamps', JSON.stringify(existingCamps));

			// Notify the current organizer only
			this.notificationService.setUserType('organizer');
			const organizerMessage = `✅ Your camp at ${campDetails.location}, ${campDetails.city} has been published successfully.`;
			this.notificationService.addNotification(organizerMessage);

			// Notify donors (they will see this next time they load)
			this.notificationService.setUserType('donor');
			const donorMessage = `🩸 New blood donation camp at ${campDetails.location}, ${campDetails.city} on ${campDetails.date}`;
			this.notificationService.addNotification(donorMessage);

			// Close dialog
			this.dialogRef.close(campDetails);
		}
	}
}
