import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../available-camps/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-notifications',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './notifications.component.html',
	styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
	userName: string = ''; // Store the user's name

	constructor(private notificationService: NotificationService) {}

	notifications: any[] = [];

	ngOnInit() {
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
		const storedNotifications = localStorage.getItem('notifications');

		if (storedNotifications) {
			const allNotifications = JSON.parse(storedNotifications);

			// Filter the notification list based on the logged in user
			this.notifications = allNotifications.filter((notification: any) => notification.user === loggedUser.fullName);
		} else {
			this.notifications = []; // always make sure it's at least an array
		}
	}

	clearAll() {
		const storedNotifications = localStorage.getItem('notifications');
		const storedUser = localStorage.getItem('loggedInUser');

		if (storedNotifications && storedUser) {
			const allNotifications = JSON.parse(storedNotifications);
			const loggedUser = JSON.parse(storedUser);

			// Keep notifications where user !== logged-in user
			const updatedNotifications = allNotifications.filter((notification: any) => notification.user !== loggedUser.fullName);

			// Save updated notifications back to localStorage
			localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

			// Clear local notifications list (because we are showing only this user's notifications)
			this.notifications = [];
		}
	}
}
