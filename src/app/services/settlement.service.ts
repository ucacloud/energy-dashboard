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

  // You have to switch these if you want to test locally or on Vercel
  
  // private apiUrl = 'http://localhost:3001/api/settlements'; // Local backend URL
  private apiUrl = 'https://energy-dashboard-backend-7cbe.onrender.com/api/settlements'; // vercel url

  constructor(private http: HttpClient) {}

  getSettlements(): Observable<Settlement[]> {
    return this.http.get<Settlement[]>(this.apiUrl);
  }
}