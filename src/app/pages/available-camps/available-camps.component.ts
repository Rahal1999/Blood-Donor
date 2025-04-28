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
		this.camps = JSON.parse(localStorage.getItem('publishedCamps') || '[]');
	}

	onMakeAppointment(camp: any, index: number): void {
		const dialogRef = this.dialog.open(ConfirmAppointmentDialogComponent, {
			data: { camp },
			width: '400px',
			disableClose: true,
		});

		dialogRef.afterClosed().subscribe((confirmed) => {
			if (confirmed) {
				this.camps[index].booked = true;
				this.snackBar.open('Appointment Confirmed!', 'Close', {
					duration: 3000,
					verticalPosition: 'bottom',
					horizontalPosition: 'center',
				});
			}
		});
	}
}
