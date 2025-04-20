import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PublishCampDialogComponent } from '../available-camps/publish-camp-dialog/publish-camp-dialog.component';
import { DonationCriteriaDialogComponent } from './donation-criteria-dialog/donation-criteria-dialog.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [MatIconModule, CommonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent {
	constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {}

	userRole: 'donor' | 'organizer' | null = null;
	options: { label: string; icon: string; route: string }[] = [];

	donorOptions = [
		{ label: 'Available Camps', icon: 'campaign', route: '/available-camps' },
		{ label: 'Donation Criteria', icon: 'campaign', route: '/donation-criteria' },
		{ label: 'After Care', icon: 'campaign', route: '/after-care' },
		{ label: 'My Profile', icon: 'person', route: '/profile' },
	];

	organizerOptions = [
		{ label: 'Publish Camps', icon: 'campaign', route: '/publish-camps' },
		{ label: 'View Published Camps', icon: 'visibility', route: '/published-camps' },
		{ label: 'My Profile', icon: 'person', route: '/profile' },
	];

	ngOnInit(): void {
		this.userRole = this.authService.getUserRole();
		this.options = this.userRole === 'donor' ? this.donorOptions : this.organizerOptions;
	}

	onOptionSelect(option: any) {
		// const selectedOption = this.options.find((opt) => opt.label.toLowerCase().replace(/\s+/g, '-') === option);

		if (option?.label === 'Publish Camps') {
			this.openPublishDialog();
			return;
		}

		if (option?.label === 'Donation Criteria') {
			this.openDonationCriteriaDialog();
			return;
		}

		if (option?.route) {
			console.log('Navigating to:', option.route); // ✅ Add this
			this.router.navigate([option.route]);
		} else {
			console.warn('Invalid option selected');
		}
	}
	
	openDonationCriteriaDialog() {
		this.dialog.open(DonationCriteriaDialogComponent, {
			width: '600px',
		});
	

	}

	openPublishDialog() {
		const dialogRef = this.dialog.open(PublishCampDialogComponent, {
			width: '400px',
		});



		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log('Camp Published:', result);
			}
		});
	}
}
