import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {



  notifications = [
  { message: "Your camp has been published successfully.", time: "Now" },
  { message: "Devin wants to make an appointment.", time: "10 Mins ago" },
  { message: "Your profile information was updated.", time: "1 Hour ago" },
  { message: "New camp is available in your area.", time: "3 Hours ago" }
];

}
