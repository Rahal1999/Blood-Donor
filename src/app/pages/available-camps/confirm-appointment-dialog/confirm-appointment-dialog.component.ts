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
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}'); // your logged-in user object
		const camp = this.data?.camp;

		if (camp && loggedUser?.fullName) {
			const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
			const notificationsOrganizer = JSON.parse(localStorage.getItem('notifications_organizer') || '[]');

			const now = new Date();
			const newNotification = {
				message: `${camp.location} has been booked`,
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

			// Send notification to the camp organizer
			// to add the new item on the top of the list
			notificationsOrganizer.unshift(newOrganizerNotification);
			localStorage.setItem('notifications_organizer', JSON.stringify(notificationsOrganizer));

			// Send notification to the logged user
			// to add the new item on the top of the list
			notifications.unshift(newNotification);
			localStorage.setItem('notifications', JSON.stringify(notifications));
		}

		this.dialogRef.close(true);
	}

	onCancel(): void {
		this.dialogRef.close(false);
	}
}
