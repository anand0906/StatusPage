import { Component, input } from '@angular/core';
import { SharedModule } from '../../../shared';

@Component({
  selector: 'app-timeline',
  imports: [SharedModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  timelineData: any = input.required<any>();

  ngOnInit(): void {
    this.timelineData().sort((a: any, b: any) => a.updated_at - b.updated_at);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Operational':
        return 'Operational';
      case 'Degraded':
        return 'Degraded';
      case 'Outage':
        return 'Outage';
      case 'Maintenance':
        return 'Maintenance';
      default:
        return '';
    }
  }
}
