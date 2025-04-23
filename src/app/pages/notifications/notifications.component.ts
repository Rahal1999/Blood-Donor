import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../available-camps/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: { message: string; time: string }[] = [];
  userName: string = ''; // Store the user's name

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Retrieve the user's name from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.userName = parsedUser.fullName || parsedUser.username || 'User'; // Use 'User' if no name is found
    }

    // Retrieve user role and set notification service's user type
    const role = localStorage.getItem('userRole'); // 'donor' or 'organizer'
    this.notificationService.setUserType(role === 'organizer' ? 'organizer' : 'donor');
  
    // Subscribe to notifications
    this.notificationService.notifications$.subscribe((data) => {
      this.notifications = data;
    });
  }
  
  clearAll() {
    this.notificationService.clearNotifications();
  }
}
