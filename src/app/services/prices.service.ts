import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Price {
  id: number;
  node: string;
  price: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private http = inject(HttpClient);

  // Render url
  private apiUrl = 'https://energy-dashboard-nzok.onrender.com/api/prices';

  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl);
  }
}