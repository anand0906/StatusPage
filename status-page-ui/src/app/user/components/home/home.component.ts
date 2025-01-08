import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ServicesService } from '../../../admin/services/services.service';
import { IncidentService } from '../../../admin/services/incident.service';
import { TimelineComponent } from '../timeline/timeline.component';
import { WebSocketService } from '../../../shared/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [SharedModule, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  serviceServices = inject(ServicesService);
  incidentsServices = inject(IncidentService);
  webSocketService = inject(WebSocketService);
  services: any = [];
  incidents: any = [];
  issues: any = [];
  private socketSubscription!: Subscription;

  ngOnInit(): void {
    this.__connect();
    this.getServices();
    this.getIncidents();
  }

  getServices() {
    this.serviceServices.getServices().subscribe({
      next: (data: any) => {
        this.services = [];

        data.forEach((temp: any) => {
          this.services.push({
            name: temp.name,
            status: temp.status,
            description: temp.description,
          });
          this.issues.push({
            title: `${temp.name} Service Status Updated`,
            description: temp.description,
            timestamp: temp.updated_at,
            service: temp.name,
            status: temp.status,
          });
        });
      },
    });
  }

  getIncidents() {
    this.incidentsServices.getIncidents().subscribe({
      next: (data: any) => {
        this.incidents = [];

        data.forEach((temp: any) => {
          this.incidents.push({
            title: temp.title,
            timestamp: temp.updated_at,
            description: temp.description,
            status: temp.status,
          });
          this.issues.push({
            title: `${temp.title} Incident Updated`,
            description: temp.description,
            timestamp: temp.updated_at,
            service: temp.title,
            status: temp.status,
          });
        });
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Operational':
        return 'status-operational';
      case 'Degraded Performance':
        return 'status-degraded';
      case 'Partial Outage':
        return 'status-partial';
      case 'Major Outage':
        return 'status-major';
      case 'Open':
        return 'status-operational';
      case 'In Progress':
        return 'status-partial';
      case 'Resolved':
        return 'status-degraded';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
    this.webSocketService.disconnect();
  }

  private __connect() {
    this.socketSubscription = this.webSocketService.connect().subscribe({
      next: (message) => {
        this.issues = [];
        this.getIncidents();
        this.getServices();
      },
      error: (err) => console.error('WebSocket Error: ', err),
      complete: () => console.log('WebSocket Closed'),
    });
  }
}
