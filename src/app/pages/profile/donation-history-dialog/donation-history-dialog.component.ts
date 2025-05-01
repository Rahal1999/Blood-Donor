import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-history-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './donation-history-dialog.component.html',
  styleUrl: './donation-history-dialog.component.css',
})
export class DonationHistoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DonationHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { history: string[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
