import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://127.0.0.1:8000/ws/status/');
  }

  connect(): Observable<any> {
    return this.socket$;
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  disconnect(): void {
    this.socket$.complete();
  }
}
