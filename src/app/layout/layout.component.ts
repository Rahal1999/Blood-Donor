import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
	userName: string | null = null;
	
	constructor(private router: Router) {}

	ngOnInit() {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
   		if (loggedInUser) {
     		this.userName = loggedInUser.fullName; // Assuming 'fullName' is stored in the user object
    	}
 	}

	navigateTo(route: string) {
		this.router.navigate([route]);
	}
}

  
