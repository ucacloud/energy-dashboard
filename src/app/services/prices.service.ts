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
  /** HttpClient injected for standalone usage */
  private http = inject(HttpClient);

  /** Your Render backend endpoint */
  private apiUrl = 'https://energy-dashboard-nzok.onrender.com/api/prices';

  /** Fetch the array of prices */
  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl);
  }
}