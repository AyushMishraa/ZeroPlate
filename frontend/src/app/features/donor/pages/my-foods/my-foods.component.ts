import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { FoodService } from '../../../../core/services/food.service';
import { FoodItem } from '../../../../core/models';

@Component({
  selector: 'app-my-foods',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './my-foods.component.html',
  styleUrl: './my-foods.component.scss'
})
export class MyFoodsComponent implements OnInit {
  isLoading = true;
  allFoods: FoodItem[] = [];
  filteredFoods: FoodItem[] = [];
  selectedFilter: string = 'all';

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMyFoods();
  }

  loadMyFoods(): void {
    const userId = this.authService.getUserId();

    this.foodService.getAllFoods().subscribe({
      next: (response) => {
        const allFoods = Array.isArray(response.food) ? response.food : [];

        // Filter user's foods
        this.allFoods = allFoods.filter(food => {
          const donorId = typeof food.donor === 'object' ? food.donor._id : food.donor;
          return donorId === userId;
        });

        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load foods:', error);
        this.isLoading = false;
        this.snackBar.open('Failed to load food items', 'Close', { duration: 3000 });
      }
    });
  }

  filterBy(status: string): void {
    this.selectedFilter = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredFoods = this.allFoods;
    } else {
      this.filteredFoods = this.allFoods.filter(food => food.status === this.selectedFilter);
    }
  }

  getFoodCountByStatus(status: string): number {
    if (status === 'all') return this.allFoods.length;
    return this.allFoods.filter(food => food.status === status).length;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diffTime = d.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `in ${diffDays} days`;

    return d.toLocaleDateString();
  }

  editFood(food: FoodItem): void {
    // TODO: Implement edit functionality
    this.snackBar.open('Edit functionality coming soon!', 'Close', { duration: 2000 });
  }

  deleteFood(food: FoodItem): void {
    if (confirm(`Are you sure you want to delete "${food.title}"?`)) {
      this.foodService.deleteFood(food._id).subscribe({
        next: () => {
          this.snackBar.open('Food item deleted successfully', 'Close', { duration: 3000 });
          this.loadMyFoods(); // Reload the list
        },
        error: (error) => {
          this.snackBar.open('Failed to delete food item', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
