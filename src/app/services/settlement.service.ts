import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Settlement {
  id: number;
  name: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  private apiUrl = 'https://energy-dashboard-backend-7cbe.onrender.com/api/settlements';

  constructor(private http: HttpClient) {}

  getSettlements(): Observable<Settlement[]> {
    return this.http.get<Settlement[]>(this.apiUrl);
  }
}