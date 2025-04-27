import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../available-camps/services/notification.service';

@Component({
	selector: 'app-donation-criteria-dialog',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
	templateUrl: './donation-criteria-dialog.component.html',
	styleUrl: './donation-criteria-dialog.component.css',
})
export class DonationCriteriaDialogComponent {
	donationForm!: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<DonationCriteriaDialogComponent>,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.donationForm = this.fb.group({
			age: ['', [Validators.required, Validators.min(18)]],
			weight: ['', [Validators.required, Validators.min(50)]],
			lastDonationDate: ['', Validators.required],
			nic: ['', Validators.required],
			tattoo: ['', Validators.required],
			pregnant: ['', Validators.required],
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		if (this.donationForm.invalid) {
			this.donationForm.markAllAsTouched();
			return;
		}

		const { age, weight, tattoo, pregnant, lastDonationDate } = this.donationForm.value;
		const ageVal = Number(age);
		const weightVal = Number(weight);

		// Check if the last donation is recent
		let isRecentDonation = false;
		if (lastDonationDate) {
			const lastDate = new Date(lastDonationDate);
			const today = new Date();
			const fourMonthsAgo = new Date(today);
			fourMonthsAgo.setMonth(today.getMonth() - 4);
			isRecentDonation = lastDate > fourMonthsAgo;
		}

		const isEligible = ageVal > 18 && weightVal > 50 && tattoo === 'no' && pregnant === 'no' && !isRecentDonation;

		const message = isEligible ? '✅ You are Eligible to donate' : '❌ You are Not eligible to donate';

		// Show snackbar
		this.snackBar.open(message, 'Close', {
			duration: 3000,
			panelClass: isEligible ? 'snack-success' : 'snack-error',
		});

		// Add to notifications
		this.notificationService.addNotification(message);
	}

	// constructor(
	// 	public dialogRef: MatDialogRef<DonationCriteriaDialogComponent>,
	// 	private snackBar: MatSnackBar,
	// 	private notificationService: NotificationService
	// ) {}

	// onClose(): void {
	// 	this.dialogRef.close();
	// }

	// onSubmit(age: string, weight: string, tattoo: string, pregnant: string, lastDonationDate: string): void {
	// 	const ageVal = Number(age);
	// 	const weightVal = Number(weight);

	// 	// Check if the donation date is within 4 months
	// 	let isRecentDonation = false;
	// 	if (lastDonationDate) {
	// 		const lastDate = new Date(lastDonationDate);
	// 		const today = new Date();
	// 		const fourMonthsAgo = new Date(today);
	// 		fourMonthsAgo.setMonth(today.getMonth() - 4);

	// 		isRecentDonation = lastDate > fourMonthsAgo;
	// 	}

	// 	const isEligible = ageVal > 18 && weightVal > 50 && tattoo === 'no' && pregnant === 'no' && !isRecentDonation;

	// 	const message = isEligible ? '✅ You are Eligible to donate' : '❌ You are Not eligible to donate';

	// 	// Show snackbar
	// 	this.snackBar.open(message, 'Close', {
	// 		duration: 3000,
	// 		panelClass: isEligible ? 'snack-success' : 'snack-error',
	// 	});

	// 	// Add to notifications
	// 	this.notificationService.addNotification(message);
	// }
}
