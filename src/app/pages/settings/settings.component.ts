import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
	userName: string | null = '';
	userRole: string | null = '';
	bloodGroup: string | null = '';
  	currentUser: any;


  constructor(private router: Router) {}

	ngOnInit(): void {
		 const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (user) {
      	this.userName = user.fullName || 'User';
      	this.userRole = user.role === 'donor' ? 'Blood Donor' : 'Camp Organizer';
		this.bloodGroup = user.bloodGroup || 'Unknown';
		this.currentUser = user;
   		}	
	}

  goBackToHome() {
    this.router.navigate(['/home']);
  }

}
