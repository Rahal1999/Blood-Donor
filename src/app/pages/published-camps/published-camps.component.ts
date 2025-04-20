import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-published-camps',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './published-camps.component.html',
  styleUrl: './published-camps.component.css'
})
export class PublishedCampsComponent {
	camps = [
		{
		  location: 'IIT',
		  date: '04th February 2024',
		  time: '10.30am onwards',
		}
	  ];
}
