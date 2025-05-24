import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Settlement {
  id: number;
  name: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/settlements`;

  getSettlements(): Observable<Settlement[]> {
    return this.http.get<Settlement[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Error fetching settlements:', err);
        return of([]);
      })
    );
  }
}