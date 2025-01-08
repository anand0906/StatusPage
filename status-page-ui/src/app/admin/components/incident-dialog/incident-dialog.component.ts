import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../shared';
import { IncidentService } from '../../services/incident.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-incident-dialog',
  imports: [SharedModule],
  templateUrl: './incident-dialog.component.html',
  styleUrl: './incident-dialog.component.scss',
})
export class IncidentDialogComponent {
  incident: any = {};
  services: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<IncidentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private incidentService: IncidentService,
    private servicesService: ServicesService
  ) {
    this.incident = data ? { ...data } : { name: '', status: 'Open' };
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data: any) => {
        this.services = data;
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.data) {
      this.incidentService.updateIncident(this.incident).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.incidentService.createIncident(this.incident).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
