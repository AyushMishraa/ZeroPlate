import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardStats, PendingPickup, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Get dashboard statistics
  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiUrl}/adminDashboard`);
  }

  // Get pending pickups
  getPendingPickups(): Observable<ApiResponse<{ pendingClaims: PendingPickup[]; count: number }>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/pendingPickups`);
  }

  // Update user role (admin only)
  updateUserRole(userId: string, role: 'donor' | 'receiver' | 'admin'): Observable<any> {
    return this.http.put(`${this.apiUrl}/role/${userId}`, { role });
  }
}
