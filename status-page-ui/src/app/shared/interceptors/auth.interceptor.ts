// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip requests where token is not needed
    if (!req.url.startsWith(environment.BASE_URL)) {
      return next.handle(req); // Skip adding the token
    }
    // Get the token from Auth0
    return this.auth.getAccessTokenSilently().pipe(
      take(1), // Take the latest token
      switchMap((token) => {
        if (token) {
          // Clone the request and add the token to the Authorization header
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedRequest);
        }
        return next.handle(req); // Send the original request if no token
      })
    );
  }
}
