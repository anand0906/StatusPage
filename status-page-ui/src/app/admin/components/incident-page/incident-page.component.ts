import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared';
import { IncidentService } from '../../services/incident.service';
import { IncidentDialogComponent } from '../incident-dialog';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-incident-page',
  imports: [SharedModule],
  templateUrl: './incident-page.component.html',
  styleUrl: './incident-page.component.scss',
})
export class IncidentPageComponent implements OnInit {
  incidents: any[] = [];
  services: any = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'service',
    'description',
    'status',
    'actions',
  ];

  constructor(
    private incidentService: IncidentService,
    private servicesService: ServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIncidents();
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data: any) => {
        this.services = data;
      },
    });
  }

  loadIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (data) => (this.incidents = data),
      error: (err) => console.error('Failed to load incidents', err),
    });
  }

  openIncidentDialog(): void {
    const dialogRef = this.dialog.open(IncidentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadIncidents();
      }
    });
  }

  editIncident(incident: any): void {
    const dialogRef = this.dialog.open(IncidentDialogComponent, {
      width: '400px',
      data: incident,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadIncidents();
      }
    });
  }

  deleteIncident(id: string): void {
    if (confirm('Are you sure you want to delete this incident?')) {
      this.incidentService
        .deleteIncident(id)
        .subscribe(() => this.loadIncidents());
    }
  }

  updateStatus(incident: any): void {
    this.incidentService.updateIncident(incident).subscribe();
  }

  getServiceName(serviceId: string): string {
    const service = this.services.find((s: any) => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Open':
        return 'warn';
      case 'In Progress':
        return 'accent';
      case 'Resolved':
        return 'primary';
      default:
        return '';
    }
  }
}
