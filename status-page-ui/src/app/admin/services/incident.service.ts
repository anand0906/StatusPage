// incident.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = environment.BASE_URL + '/activity/incidents/';

  constructor(private http: HttpClient) {}

  getIncidents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createIncident(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateIncident(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }

  deleteIncident(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { params: { id: id } });
  }
}
