import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../available-camps/services/notification.service';

@Component({
	selector: 'app-after-care',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule, MatButtonModule],
	templateUrl: './after-care.component.html',
	styleUrls: ['./after-care.component.css'],
})
export class AfterCareComponent implements OnInit {
	constructor(private snackBar: MatSnackBar, private notificationService: NotificationService) {}

	careChecklist = [
		{ label: 'Drank', type: 'input' },
		{ label: "Didn't lift any heavy weight", type: 'checkbox' },
		{ label: 'Eating iron rich food', type: 'checkbox' },
		{ label: "Didn't smoke", type: 'checkbox' },
	];

	days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() + i); // Day 1 = today, Day 7 = +6 days

		date.setHours(0, 0, 0, 0); // Normalize
		return {
			title: `Day ${i + 1}`,
			dateKey: date.toISOString().split('T')[0],
			expanded: false,
			checks: {
				waterAmount: '',
				checkboxes: [false, false, false],
			},
		};
	});

	toggleExpand(day: any) {
		day.expanded = !day.expanded;
	}

	ngOnInit() {
		this.checkForInactivity();
		this.loadPreviousDataFromLocalStorage(); // Ensure data is loaded on init
	}

	trackByIndex(index: number): number {
		return index;
	}

	onCheckboxChange(day: any, index: number, checked: boolean) {
		day.checks.checkboxes[index] = checked;
	}

	loadPreviousDataFromLocalStorage() {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
		if (!loggedInUser) return;

		const afterCareDataKey = `afterCare_${loggedInUser.fullName}`;
		const savedData = JSON.parse(localStorage.getItem(afterCareDataKey) || '{}');

		this.days.forEach((day) => {
			if (savedData[day.dateKey]) {
				day.checks = savedData[day.dateKey];
			}
		});
	}

	checkForInactivity() {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
		if (!loggedInUser) return;

		const afterCareDataKey = `afterCare_${loggedInUser.fullName}`;
		const savedData = JSON.parse(localStorage.getItem(afterCareDataKey) || '{}');

		const todayKey = this.days[this.days.length - 1].dateKey;

		if (!savedData[todayKey]) {
			this.notificationService.setUserType('donor');
			this.notificationService.addNotification(`You have not submitted your after-care data for today (${new Date().toDateString()}). Please update it!`);
		}
	}

	submitAfterCare() {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
		if (!loggedInUser) return;

		const afterCareDataKey = `afterCare_${loggedInUser.fullName}`;
		const savedData = JSON.parse(localStorage.getItem(afterCareDataKey) || '{}');

		// Save data for all days
		this.days.forEach((day) => {
			savedData[day.dateKey] = day.checks;
		});

		savedData.user = loggedInUser.fullName;
		localStorage.setItem(afterCareDataKey, JSON.stringify(savedData));

		// Send a notification to the donor
		this.notificationService.setUserType('donor');
		this.notificationService.addNotification('Your after-care checklist has been successfully submitted. Thank you for your cooperation!');

		this.snackBar.open('Thank you! Your after-care checklist has been submitted.', 'Close', {
			duration: 4000,
		});
	}
}
