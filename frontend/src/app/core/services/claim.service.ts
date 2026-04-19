import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Claim, ClaimResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = `${environment.apiUrl}/claims`;

  constructor(private http: HttpClient) {}

  // Create a new claim (receivers only)
  createClaim(foodId: string): Observable<ClaimResponse> {
    return this.http.post<ClaimResponse>(this.apiUrl, { foodId });
  }

  // Get all my claims (receivers only)
  getMyClaims(): Observable<ClaimResponse> {
    return this.http.get<ClaimResponse>(this.apiUrl);
  }

  // Get all claims (admin only)
  getAllClaims(): Observable<ClaimResponse> {
    return this.http.get<ClaimResponse>(`${this.apiUrl}/all`);
  }
}
