import { Component } from '@angular/core';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { ServicesService } from '../../services/services.service';
import { SharedModule } from '../../../shared';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-page',
  imports: [SharedModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent {
  services: any[] = [];
  displayedColumns: string[] = ['name', 'status', 'description', 'actions'];

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data: any) => {
        this.services = data;
      },
      error: () => {
        this.snackBar.open('Failed to load services', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  addService(): void {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '400px',
      data: { mode: 'Add' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.servicesService.addService(result).subscribe({
          next: () => {
            this.loadServices();
            this.snackBar.open('Service added successfully', 'Close', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackBar.open('Failed to add service', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editService(service: any): void {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '400px',
      data: { mode: 'Edit', service },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.servicesService.updateService(result).subscribe({
          next: () => {
            this.loadServices();
            this.snackBar.open('Service updated successfully', 'Close', {
              duration: 3000,
            });
          },
          error: () => {
            this.snackBar.open('Failed to update service', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.servicesService.deleteService(id).subscribe({
        next: () => {
          this.loadServices();
          this.snackBar.open('Service deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackBar.open('Failed to delete service', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }

  getStatusColor(status: string): string {
    return status === 'Active' ? 'primary' : 'warn';
  }
}
