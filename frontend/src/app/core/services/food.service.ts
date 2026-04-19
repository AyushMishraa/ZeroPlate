import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FoodItem, FoodResponse, CreateFoodData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = `${environment.apiUrl}/foods`;

  constructor(private http: HttpClient) {}

  // Get all food items
  getAllFoods(): Observable<FoodResponse> {
    return this.http.get<FoodResponse>(this.apiUrl);
  }

  // Get only available food items
  getAvailableFoods(): Observable<FoodResponse> {
    return this.http.get<FoodResponse>(`${this.apiUrl}/available`);
  }

  // Create new food listing (donors only)
  createFood(foodData: CreateFoodData): Observable<FoodResponse> {
    return this.http.post<FoodResponse>(`${this.apiUrl}/add-foodItem`, foodData);
  }

  // Update food item (donors/admin only)
  updateFood(foodId: string, updates: Partial<FoodItem>): Observable<FoodResponse> {
    return this.http.patch<FoodResponse>(`${this.apiUrl}/update-foodItem/${foodId}`, updates);
  }

  // Delete food item (donors/admin only)
  deleteFood(foodId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-foodItem/${foodId}`);
  }

  // Helper method to get donor's own foods (client-side filtering)
  getMyFoods(userId: string): Observable<FoodResponse> {
    return this.getAllFoods();
  }
}
