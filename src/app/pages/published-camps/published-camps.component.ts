import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-published-camps',
	standalone: true,
	imports: [CommonModule, NgForOf],
	templateUrl: './published-camps.component.html',
	styleUrl: './published-camps.component.css',
})
export class PublishedCampsComponent implements OnInit {
	camps: any[] = [];
	i: number | undefined;

	appointments: { name: string; time: string }[] = [];

	ngOnInit() {
		const loggedUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
		const storedCamps = localStorage.getItem('publishedCamps') || '[]';
		const allCamps = JSON.parse(storedCamps);
	
		this.camps = allCamps.filter((camp: any) => camp.user === loggedUser.fullName);
	
		const storedAppointments = JSON.parse(localStorage.getItem('appointments_organizer') || '[]');
		this.appointments = storedAppointments.filter((appt: any) => appt.organizer === loggedUser.fullName);
	}
	

	deleteCamp(index: number) {
		this.camps.splice(index, 1);
		localStorage.setItem('publishedCamps', JSON.stringify(this.camps));
	}

	removeAppointment(index: number) {
		this.appointments.splice(index, 1);
		localStorage.setItem('appointments_organizer', JSON.stringify(this.appointments));
	}
	
}
