import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnalyticsSummary, TopDonor, FraudData, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  constructor(private http: HttpClient) {}

  // Get analytics summary
  getAnalyticsSummary(): Observable<ApiResponse<AnalyticsSummary>> {
    return this.http.get<ApiResponse<AnalyticsSummary>>(`${this.apiUrl}/getAnalytics`);
  }

  // Get top donors
  getTopDonors(limit: number = 10): Observable<ApiResponse<TopDonor[]>> {
    return this.http.get<ApiResponse<TopDonor[]>>(`${this.apiUrl}/top-donors?limit=${limit}`);
  }

  // Get fraud detection data
  getFraudData(recentMinutes: number = 60, rapidThreshold: number = 5): Observable<ApiResponse<FraudData>> {
    return this.http.get<ApiResponse<FraudData>>(
      `${this.apiUrl}/frauds?recentMinutes=${recentMinutes}&rapidThreshold=${rapidThreshold}`
    );
  }
}
