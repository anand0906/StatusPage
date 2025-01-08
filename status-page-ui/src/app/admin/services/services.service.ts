import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = environment.BASE_URL + '/services/'; // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addService(service: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, service);
  }

  updateService(service: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { params: { id: id } });
  }
}
