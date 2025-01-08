import { Component, Inject, inject } from '@angular/core';
import { SharedModule } from '../../../shared';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [SharedModule, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
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
