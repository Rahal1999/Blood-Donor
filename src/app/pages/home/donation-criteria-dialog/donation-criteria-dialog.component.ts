import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
		private snackBar: MatSnackBar
	  ) {}
	
	  onClose(): void {
		this.dialogRef.close();
	  }
	
	  onSubmit(age: string, weight: string, tattoo: string, pregnant: string): void {
		const ageVal = Number(age);
		const weightVal = Number(weight);
	
		const isEligible =
		  ageVal > 18 &&
		  weightVal > 50 &&
		  tattoo === 'no' &&
		  pregnant === 'no';
	
		const message = isEligible ? '✅ Eligible to donate' : '❌ Not eligible to donate';
	
		this.snackBar.open(message, 'Close', {
		  duration: 3000,
		  panelClass: isEligible ? 'snack-success' : 'snack-error'
		});
	  }
}
