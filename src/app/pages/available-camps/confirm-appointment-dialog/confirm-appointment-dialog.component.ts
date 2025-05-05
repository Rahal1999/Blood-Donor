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
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}'); // get current logged-in user	
		const camp = this.data?.camp; //get selected camp data to this component
	
		if (camp && loggedUser?.fullName) { // retreive existing notifications and appointments from local storage
			const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
			const notificationsOrganizer = JSON.parse(localStorage.getItem('notifications_organizer') || '[]');
			const appointmentsOrganizer = JSON.parse(localStorage.getItem('appointments_organizer') || '[]');
	
			const now = new Date(); //get current date and time
	
			const newNotification = { // create new notification for the donor
				message: `Donation camp at ${camp.location} has been booked`,
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				date: now.toISOString().split('T')[0],
				user: loggedUser.fullName,
			};
	
			const newOrganizerNotification = { // create new notification for the camp organizer
				message: `Your Donation camp at 🧾 ${camp.location} has been booked by the donor - ${loggedUser.fullName}`,
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				date: now.toISOString().split('T')[0],
				user: camp.user,
			};
	
			const newAppointment = { //create new appointment record for the organizer
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
