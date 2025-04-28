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
		const storedCamps = localStorage.getItem('publishedCamps') || '{}';
		const allNotifications = JSON.parse(storedCamps);

		// Filter the notification list based on the logged in user
		this.camps = allNotifications.filter((camp: any) => camp.user === loggedUser.fullName);

		const storedAppointments = localStorage.getItem('appointments');
		this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
	}

	deleteCamp(index: number) {
		this.camps.splice(index, 1);
		localStorage.setItem('publishedCamps', JSON.stringify(this.camps));
	}

	removeAppointment(index: number) {
		this.appointments.splice(index, 1);
		localStorage.setItem('appointments', JSON.stringify(this.appointments));
	}
}
