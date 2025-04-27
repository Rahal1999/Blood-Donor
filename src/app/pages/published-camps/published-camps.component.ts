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
		const storedCamps = localStorage.getItem('publishedCamps');
		this.camps = storedCamps ? JSON.parse(storedCamps) : [];

		const storedAppointments = localStorage.getItem('appointments');
		this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
	}

	loadCamps() {
		const storedCamps = localStorage.getItem('publishedCamps');
		this.camps = storedCamps ? JSON.parse(storedCamps) : [];
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
