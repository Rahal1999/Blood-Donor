import { Component } from '@angular/core';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';

@Component({
	selector: 'app-confirm-appointment-dialog',
	standalone: true,
	imports: [MatDialogModule, MatDialogContent],
	templateUrl: './confirm-appointment-dialog.component.html',
	styleUrl: './confirm-appointment-dialog.component.css',
})
export class ConfirmAppointmentDialogComponent {
	constructor(
		private dialogRef: MatDialogRef<ConfirmAppointmentDialogComponent>,
		private notificationService: NotificationService
	) {}

	onConfirm(): void {
		const userRole = localStorage.getItem('userRole');
	const donorName = localStorage.getItem('userName') || 'A donor';

	if (userRole === 'donor') {
		// Temporarily switch context to organizer to send the notification to their store
		this.notificationService.setUserType('organizer');
		this.notificationService.addNotification(`${donorName} has made an appointment for a blood donation camp.`);

		// Store appointment info in localStorage for organizer
		const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
		appointments.push({ name: donorName, time: new Date().toLocaleString() });
		localStorage.setItem('appointments', JSON.stringify(appointments));

		// Notify donor of successful booking
		this.notificationService.setUserType('donor');
		this.notificationService.addNotification('Your appointment has been booked successfully.');

		// Optional: switch back to donor (if donor's notification state matters)
		this.notificationService.setUserType('donor');
	}

	this.dialogRef.close(true);
	}

	onCancel(): void {
		this.dialogRef.close(false);
	}
}