import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface LmpData {
  node: string;
  timestamp: string;
  lmp: number;
  energy: number;
  congestion: number;
  loss: number;
}

export interface LmpComparisonData {
  timestamp: string;
  node: string;
  dayAhead: number;
  realTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class LmpService {
  private http = inject(HttpClient);
  private lmpUrl = `${environment.apiBaseUrl}/lmp`;
  private comparisonUrl = `${environment.apiBaseUrl}/lmp-comparison`;
  
  getLmpData(): Observable<LmpData[]> {
    return this.http.get<LmpData[]>(this.lmpUrl).pipe(
      catchError(err => {
        console.error('Error fetching LMP data:', err);
        return of([]);
      })
    );
  }

  getLmpComparisonData(): Observable<LmpComparisonData[]> {
  return this.http.get<LmpComparisonData[]>(this.comparisonUrl).pipe(
      catchError(err => {
        console.error('Error fetching LMP comparison data:', err);
        return of([]);
      })
    );
}
}
