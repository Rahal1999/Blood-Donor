import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../available-camps/services/notification.service';


@Component({
  selector: 'app-donation-criteria-dialog',
  standalone: true,
  imports: [],
  templateUrl: './donation-criteria-dialog.component.html',
  styleUrl: './donation-criteria-dialog.component.css'
})
export class DonationCriteriaDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<DonationCriteriaDialogComponent>,
		private snackBar: MatSnackBar,
		private notificationService: NotificationService
	  ) {}
	
	  onClose(): void {
		this.dialogRef.close();
	  }
	
	  onSubmit(age: string, weight: string, tattoo: string, pregnant: string, lastDonationDate: string): void {
		const ageVal = Number(age);
		const weightVal = Number(weight);

		// Check if the donation date is within 4 months
		let isRecentDonation = false;
		if (lastDonationDate) {
		const lastDate = new Date(lastDonationDate);
		const today = new Date();
		const fourMonthsAgo = new Date(today);
		fourMonthsAgo.setMonth(today.getMonth() - 4);

		isRecentDonation = lastDate > fourMonthsAgo;
	}
	  
		const isEligible =
		  ageVal > 18 &&
		  weightVal > 50 &&
		  tattoo === 'no' &&
		  pregnant === 'no' &&
		  !isRecentDonation;

		const message = isEligible ? '✅ You are Eligible to donate' : '❌ You are Not eligible to donate';
	  
		// Show snackbar
		this.snackBar.open(message, 'Close', {
		  duration: 3000,
		  panelClass: isEligible ? 'snack-success' : 'snack-error'
		});
	  
		// Add to notifications
		this.notificationService.addNotification(message);
	  }
	  
}
