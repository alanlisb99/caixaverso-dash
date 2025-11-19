
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Investment {
  id: number;
  product: string;
  type: string;
  balance: number;
  profitability: number;
}

export interface InvestmentHistoryPoint {
  id: number;
  month: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investmentsUrl = 'http://localhost:3000/investments';
  private historyUrl = 'http://localhost:3000/investmentHistory';

  constructor(private http: HttpClient) {}

  getInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.investmentsUrl);
  }

  getInvestmentHistory(): Observable<InvestmentHistoryPoint[]> {
    return this.http.get<InvestmentHistoryPoint[]>(this.historyUrl);
  }
}
