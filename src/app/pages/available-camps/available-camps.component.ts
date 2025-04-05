import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmAppointmentDialogComponent } from './confirm-appointment-dialog/confirm-appointment-dialog.component';

@Component({
	selector: 'app-available-camps',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './available-camps.component.html',
	styleUrl: './available-camps.component.css',
})
export class AvailableCampsComponent {
	constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

	camps: any[] = [
		{ title: 'Camp Details', location: 'IIT', date: '04th February 2024', time: '10:30 AM onwards', slots: 10, bloodGroups: ['A+', 'B+', 'O-'] },
		{ title: 'Camp Details', location: 'City Hospital', date: '10th February 2024', time: '11:00 AM onwards', slots: 5, bloodGroups: ['A-', 'O+', 'B-'] },
		{
			title: 'Camp Details',
			location: 'Community Center',
			date: '15th February 2024',
			time: '9:00 AM onwards',
			slots: 12,
			bloodGroups: ['AB+', 'O+', 'A+'],
		},
		{
			title: 'Camp Details',
			location: 'Red Cross Society',
			date: '20th February 2024',
			time: '10:00 AM onwards',
			slots: 8,
			bloodGroups: ['B+', 'O+', 'AB-'],
		},
		{ title: 'Camp Details', location: 'Health Hub', date: '25th February 2024', time: '1:00 PM onwards', slots: 15, bloodGroups: ['A+', 'AB+', 'O-'] },
		{ title: 'Camp Details', location: 'Govt. Hospital', date: '28th February 2024', time: '10:00 AM onwards', slots: 6, bloodGroups: ['O+', 'A-', 'B-'] },
		{ title: 'Camp Details', location: 'Wellness Center', date: '02nd March 2024', time: '2:00 PM onwards', slots: 10, bloodGroups: ['A+', 'B+', 'O+'] },
		{ title: 'Camp Details', location: 'Blood Bank', date: '05th March 2024', time: '12:00 PM onwards', slots: 7, bloodGroups: ['O+', 'A+', 'AB-'] },
		{ title: 'Camp Details', location: 'University Clinic', date: '10th March 2024', time: '9:30 AM onwards', slots: 9, bloodGroups: ['A-', 'B-', 'O-'] },
		{ title: 'Camp Details', location: 'Mega Health Camp', date: '15th March 2024', time: '11:30 AM onwards', slots: 20, bloodGroups: ['A+', 'O+', 'AB+'] },
	];

	onMakeAppointment(index: number): void {
		const dialogRef = this.dialog.open(ConfirmAppointmentDialogComponent, {
			width: '400px',
			disableClose: true,
		});

		dialogRef.afterClosed().subscribe((confirmed) => {
			if (confirmed) {
				this.camps[index].booked = true; // Mark as booked
				this.snackBar.open('Appointment Confirmed!', 'Close', {
					duration: 3000,
					verticalPosition: 'bottom',
					horizontalPosition: 'center',
				});
			}
		});
	}
}
