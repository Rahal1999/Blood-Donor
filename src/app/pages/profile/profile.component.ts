import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../available-camps/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;  // Added role tracking
  lastDonationDate: Date | null = null;
  daysRemaining: number = 60;
  progressPercent: number = 0;
  publishedCamps: any[] = [];  // To store camps for organizers

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (loggedInUser) {
      this.userName = loggedInUser.fullName || 'User';
      this.userRole = loggedInUser.role;  // Get role from logged in user
    }

    if (this.userRole === 'donor') {
      const savedDate = localStorage.getItem('lastDonationDate');
      if (savedDate) {
        this.lastDonationDate = new Date(savedDate);
        this.updateProgress();
      }
    } else if (this.userRole === 'organizer') {
      this.loadPublishedCamps();
    }
  }

  recordDonation() {
    const today = new Date();
    localStorage.setItem('lastDonationDate', today.toISOString());
    this.lastDonationDate = today;
    this.updateProgress();

    this.notificationService.addNotification(
      `Thank you${this.userName ? ', ' + this.userName : ''}, for your donation! You have 60 days left until your next donation.`
    );
  }

  updateProgress() {
    if (!this.lastDonationDate) return;

    const today = new Date();
    const diffTime = today.getTime() - this.lastDonationDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    this.daysRemaining = Math.max(60 - diffDays, 0);
    this.progressPercent = Math.min((diffDays / 60) * 100, 100);
    this.progressPercent = Math.round(this.progressPercent);
  }

  loadPublishedCamps() {
    const camps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
    this.publishedCamps = camps.map((camp: any) => {
      const campDate = new Date(camp.date);
      const today = new Date();
      const diffTime = campDate.getTime() - today.getTime();
      const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // round up

      return {
        ...camp,
        remainingDays: remainingDays > 0 ? remainingDays : 0,
      };
    });
  }
}
