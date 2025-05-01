import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../available-camps/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { DonationHistoryDialogComponent } from '../profile/donation-history-dialog/donation-history-dialog.component'; 

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

  constructor(
	private notificationService: NotificationService,
	private dialog: MatDialog
) {}

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
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
	const donationHistoryKey = `donationHistory_${loggedInUser.email}`;
  
	// Get existing history or initialize empty array
	const history: string[] = JSON.parse(localStorage.getItem(donationHistoryKey) || '[]');
  
	// Add today's date to the history
	history.push(today.toISOString());
  
	// Save updated history
	localStorage.setItem(donationHistoryKey, JSON.stringify(history));
  
	// Also update last donation date as before
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
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
	const camps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
	const appointments = JSON.parse(localStorage.getItem('appointments_organizer') || '[]');
  
	// Filter to only include camps created by the logged-in user
	this.publishedCamps = camps
	  .filter((camp: any) => camp.user === loggedInUser.fullName)
	  .map((camp: any) => {
		const campDate = new Date(camp.date);
		const today = new Date();
		const diffTime = campDate.getTime() - today.getTime();
		const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		const appointmentCount = appointments.filter((appt: any) => appt.campId === camp.id).length;

		
		return {
		  ...camp,
		  remainingDays: remainingDays > 0 ? remainingDays : 0,
		  appointmentCount, 
		};
	  });
    }
  
	donationHistory: string[] = [];

	viewDonationHistory() {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
		const donationHistoryKey = `donationHistory_${loggedInUser.email}`;
		const history: string[] = JSON.parse(localStorage.getItem(donationHistoryKey) || '[]');
	  
		this.dialog.open(DonationHistoryDialogComponent, {
		  data: { history: history.reverse() },
		  width: '400px',
		});
    }
	  

}
