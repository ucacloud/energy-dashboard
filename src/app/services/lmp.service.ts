import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  // private dataUrl = '/lmp-data.json'; // local data file in /public
  private baseUrl = 'https://energy-dashboard-nzok.onrender.com/api'; // backend base URL
  private lmpUrl = `${this.baseUrl}/lmp`;
  private comparisonUrl = `${this.baseUrl}/lmp-comparison`;
  
  constructor(private http: HttpClient) {}

  getLmpData(): Observable<LmpData[]> {
    return this.http.get<LmpData[]>(this.lmpUrl); // to test locally change this.apiUrl to this.dataUrl
  }

  getLmpComparisonData(): Observable<LmpComparisonData[]> {
  return this.http.get<LmpComparisonData[]>(this.comparisonUrl);
}
}
