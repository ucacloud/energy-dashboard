import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  private apiUrl = `${environment.apiBaseUrl}/prices`;

  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Error fetching prices:', err);
        return of([]);
      })
    );
  }
}