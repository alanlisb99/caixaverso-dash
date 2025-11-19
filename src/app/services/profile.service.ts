
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RiskProfile {
  id: number;
  type: 'Conservador' | 'Moderado' | 'Agressivo' | string;
  score: number;
  level:string;
  description?: string;
}

export interface RiskHistoryPoint {
  id: number;
  month: string;
  score: number;
}

export interface RecommendedProduct {
  id: number;
  name: string;
  type: string;
  profitability: number;
  riskLevel: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private riskProfileUrl = 'http://localhost:3000/riskProfiles/1';
  private riskHistoryUrl = 'http://localhost:3000/riskHistory';
  private recommendedUrl = 'http://localhost:3000/recommendedProducts';

  constructor(private http: HttpClient) {}

  getRiskProfile(): Observable<RiskProfile> {
    return this.http.get<RiskProfile>(this.riskProfileUrl);
  }

  getRiskHistory(): Observable<RiskHistoryPoint[]> {
    return this.http.get<RiskHistoryPoint[]>(this.riskHistoryUrl);
  }

  getRecommendedProducts(): Observable<RecommendedProduct[]> {
    return this.http.get<RecommendedProduct[]>(this.recommendedUrl);
  }
}
