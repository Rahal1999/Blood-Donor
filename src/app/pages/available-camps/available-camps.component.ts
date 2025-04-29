import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class AvailableCampsComponent implements OnInit {
	camps: any[] = [];

	constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		const storedCamps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
	
		// Get booked camps for the logged-in user
		const bookedCamps = JSON.parse(localStorage.getItem(`bookedCamps_${loggedUser.fullName}`) || '[]');
	
		this.camps = storedCamps.map((camp: any) => {
			const isBooked = bookedCamps.some((bookedCamp: any) => 
				bookedCamp.location === camp.location && 
				bookedCamp.date === camp.date && 
				bookedCamp.time === camp.Time // <-- Correct here
			);
			return {
				title: 'Camp Details',
				location: camp.location,
				date: camp.date,
				time: camp.Time,
				slots: camp.slots || 10,
				bloodGroups: camp.bloodGroups?.length ? camp.bloodGroups : ['A+', 'O+'],
				booked: isBooked,
			};
		});
		
	}
	

	onMakeAppointment(camp: any, index: number): void {
		if (camp.booked) {
			this.snackBar.open('You have already booked this camp.', 'Close', {
				duration: 3000,
				verticalPosition: 'bottom',
				horizontalPosition: 'center',
			});
			return;
		}
	
		const dialogRef = this.dialog.open(ConfirmAppointmentDialogComponent, {
			data: { camp },
			width: '400px',
			disableClose: true,
		});
	
		dialogRef.afterClosed().subscribe((confirmed) => {
			if (confirmed) {
				this.camps[index].booked = true;
	
				const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
				const bookedCampsKey = `bookedCamps_${loggedUser.fullName}`;
	
				// Save to localStorage
				const existingBooked = JSON.parse(localStorage.getItem(bookedCampsKey) || '[]');
				existingBooked.push(camp);
				localStorage.setItem(bookedCampsKey, JSON.stringify(existingBooked));
	
				this.snackBar.open('Appointment Confirmed!', 'Close', {
					duration: 3000,
					verticalPosition: 'bottom',
					horizontalPosition: 'center',
				});
			}
		});
	}
	
}


// export class AvailableCampsComponent implements OnInit {
// 	camps: any[] = [];

// 	constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

// 	ngOnInit(): void {
// 		this.camps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
// 	}

// 	onMakeAppointment(camp: any, index: number): void {
// 		const dialogRef = this.dialog.open(ConfirmAppointmentDialogComponent, {
// 			data: { camp },
// 			width: '400px',
// 			disableClose: true,
// 		});

// 		dialogRef.afterClosed().subscribe((confirmed) => {
// 			if (confirmed) {
// 				this.camps[index].booked = true;
// 				this.snackBar.open('Appointment Confirmed!', 'Close', {
// 					duration: 3000,
// 					verticalPosition: 'bottom',
// 					horizontalPosition: 'center',
// 				});
// 			}
// 		});
// 	}
// }