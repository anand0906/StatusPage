import { Component, Inject, inject } from '@angular/core';
import { Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ServicePageComponent } from '../../components/service-page/service-page.component';
import { SharedModule } from '../../../shared';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [SharedModule, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  currentYear: number = new Date().getFullYear();
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  constructor(@Inject(DOCUMENT) public document: Document) {}
  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
