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
	
		this.camps = allCamps.filter((camp: any) => camp.user === loggedUser.fullName); // Filter camps that were published by the logged-in organizer

	
		const storedAppointments = JSON.parse(localStorage.getItem('appointments_organizer') || '[]'); 	// Get all stored appointments for organizers from localStorage

		this.appointments = storedAppointments.filter((appt: any) => appt.organizer === loggedUser.fullName);
	}
	

	deleteCamp(index: number) { // delete camp
		this.camps.splice(index, 1);
		localStorage.setItem('publishedCamps', JSON.stringify(this.camps));
	}

	removeAppointment(index: number) { // remove appointment 
		this.appointments.splice(index, 1);
		localStorage.setItem('appointments_organizer', JSON.stringify(this.appointments));
	}
	
}
