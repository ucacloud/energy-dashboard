import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplianceCheckerService {
  private apiUrl = 'https://energy-dashboard-nzok.onrender.com/api/compliance-check';

  constructor(private http: HttpClient) {}

  checkCompliance(logText: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { log: logText });
  }
}