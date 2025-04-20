import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-after-care',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule],
  templateUrl: './after-care.component.html',
  styleUrls: ['./after-care.component.css'],
})
export class AfterCareComponent {
  constructor(private snackBar: MatSnackBar) {}

  careChecklist = [
    { label: 'Drank', type: 'input' },
    { label: "Didn't lift any heavy weight", type: 'checkbox' },
    { label: 'Eating iron rich food', type: 'checkbox' },
    { label: "Didn't smoke", type: 'checkbox' },
  ];

  days = Array.from({ length: 7 }, (_, i) => ({
    title: `Day ${i + 1}`,
    expanded: false,
    checks: {
      waterAmount: '',
      checkboxes: new Array(3).fill(false),
    },
  }));

  toggleExpand(day: any) {
    day.expanded = !day.expanded;
  }

  submitAfterCare() {
    // Example: Log to console or send to a backend service here
    console.log('Submitted After-Care Data:', this.days);

    this.snackBar.open('Thank you! Your after-care checklist has been submitted.', 'Close', {
      duration: 4000,
    });
  }
}
