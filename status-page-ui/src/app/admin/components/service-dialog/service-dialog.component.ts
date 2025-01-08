import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-dialog',
  imports: [SharedModule],
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.scss',
})
export class ServiceDialogComponent {
  service: any = { name: '', status: 'Operational', description: '' }; // Default values
  statuses = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ];

  constructor(
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.mode === 'Edit' && data.service) {
      this.service = { ...data.service };
    }
  }

  save(): void {
    this.dialogRef.close(this.service);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
