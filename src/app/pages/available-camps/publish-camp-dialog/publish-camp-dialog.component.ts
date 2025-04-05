import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-publish-camp-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	templateUrl: './publish-camp-dialog.component.html',
	styleUrl: './publish-camp-dialog.component.css',
})
export class PublishCampDialogComponent {
	campForm: FormGroup;

	constructor(private dialogRef: MatDialogRef<PublishCampDialogComponent>, private fb: FormBuilder) {
		this.campForm = this.fb.group({
			organizerName: ['', Validators.required],
			location: ['', Validators.required],
			date: ['', Validators.required],
			district: ['', Validators.required],
			city: ['', Validators.required],
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		if (this.campForm.valid) {
			console.log('Camp Details:', this.campForm.value);
			this.dialogRef.close(this.campForm.value);
		}
	}
}
