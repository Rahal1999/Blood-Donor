import { Component } from '@angular/core';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm-appointment-dialog',
	standalone: true,
	imports: [MatDialogModule, MatDialogContent],
	templateUrl: './confirm-appointment-dialog.component.html',
	styleUrl: './confirm-appointment-dialog.component.css',
})
export class ConfirmAppointmentDialogComponent {
	constructor(private dialogRef: MatDialogRef<ConfirmAppointmentDialogComponent>) {}

	onConfirm(): void {
		this.dialogRef.close(true);
	}

	onCancel(): void {
		this.dialogRef.close(false);
	}
}
