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

@Injectable({
  providedIn: 'root',
})
export class LmpService {
  // private dataUrl = '/lmp-data.json'; // local data file in /public
  private apiUrl = 'http://localhost:3001/api/lmp'; // backend URL

  constructor(private http: HttpClient) {}

  getLmpData(): Observable<LmpData[]> {
    return this.http.get<LmpData[]>(this.apiUrl); // to test locally change this.apiUrl to this.dataUrl
  }
}
