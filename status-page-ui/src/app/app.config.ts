import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: environment.AUTH0_DOMAIN, // Your Auth0 domain
      clientId: environment.AUTH0_CLIENT_ID, // Your Auth0 client ID
      authorizationParams: {
        redirect_uri: window.location.origin, // Redirect after login
        audience: environment.AUTH0_API_IDENTIFIER, // Backend API identifier
        scope: 'read:services write:services', // Request specific scopes
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.BASE_URL}/*`, // Your backend API base URL
            tokenOptions: {
              authorizationParams: {
                audience: environment.AUTH0_API_IDENTIFIER,
                scope: 'read:services write:services',
              },
            },
          },
        ],
      },
    }),

    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};
