import { Component, Inject } from '@angular/core';
import { MatDialogContent, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
		private notificationService: NotificationService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	onConfirm(): void {
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
		const camp = this.data?.camp;
	
		if (camp && loggedUser?.fullName) {
			const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
			const notificationsOrganizer = JSON.parse(localStorage.getItem('notifications_organizer') || '[]');
			const appointmentsOrganizer = JSON.parse(localStorage.getItem('appointments_organizer') || '[]');
	
			const now = new Date();
	
			const newNotification = {
				message: `Donation camp at ${camp.location} has been booked`,
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				date: now.toISOString().split('T')[0],
				user: loggedUser.fullName,
			};
	
			const newOrganizerNotification = {
				message: `🧾 ${camp.location} has been booked by the donor - ${loggedUser.fullName}`,
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				date: now.toISOString().split('T')[0],
				user: camp.user,
			};
	
			const newAppointment = {
				name: loggedUser.fullName,
				campId: camp.id,
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				date: now.toISOString().split('T')[0],
				campLocation: camp.location,
				organizer: camp.user,
			};

			// Add notifications
			notificationsOrganizer.unshift(newOrganizerNotification);
			localStorage.setItem('notifications_organizer', JSON.stringify(notificationsOrganizer));
	
			notifications.unshift(newNotification);
			localStorage.setItem('notifications', JSON.stringify(notifications));
	
			// Add appointment for organizer
			appointmentsOrganizer.unshift(newAppointment);
			localStorage.setItem('appointments_organizer', JSON.stringify(appointmentsOrganizer));
		}
	
		this.dialogRef.close(true);
	}
	

	onCancel(): void {
		this.dialogRef.close(false);
	}
}
