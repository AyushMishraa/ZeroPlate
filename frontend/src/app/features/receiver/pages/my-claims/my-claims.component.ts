import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClaimService } from '../../../../core/services/claim.service';
import { Claim, FoodItem } from '../../../../core/models';

@Component({
  selector: 'app-my-claims',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './my-claims.component.html',
  styleUrl: './my-claims.component.scss'
})
export class MyClaimsComponent implements OnInit {
  isLoading = true;
  allClaims: Claim[] = [];
  filteredClaims: Claim[] = [];
  selectedFilter = 'all';

  constructor(
    private claimService: ClaimService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMyClaims();
  }

  loadMyClaims(): void {
    this.claimService.getMyClaims().subscribe({
      next: (response) => {
        this.allClaims = Array.isArray(response.claims) ? response.claims : [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load claims:', error);
        this.isLoading = false;
        this.snackBar.open('Failed to load claims', 'Close', { duration: 3000 });
      }
    });
  }

  filterBy(status: string): void {
    this.selectedFilter = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredClaims = this.allClaims;
    } else {
      this.filteredClaims = this.allClaims.filter(claim => claim.status === this.selectedFilter);
    }
  }

  getAllClaimsCount(): number {
    return this.allClaims.length;
  }

  getClaimCountByStatus(status: string): number {
    return this.allClaims.filter(claim => claim.status === status).length;
  }

  getFoodTitle(claim: Claim): string {
    if (typeof claim.food === 'object') {
      return claim.food.title;
    }
    return 'Food Item';
  }

  getFoodQuantity(claim: Claim): number {
    if (typeof claim.food === 'object') {
      return claim.food.quantity;
    }
    return 0;
  }

  getDonorName(claim: Claim): string {
    if (typeof claim.food === 'object' && typeof claim.food.donor === 'object') {
      return claim.food.donor.name;
    }
    return 'Unknown';
  }

  getPickupLocation(claim: Claim): string {
    if (typeof claim.food === 'object') {
      return claim.food.pickupLocation;
    }
    return 'Unknown';
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      pending: 'pending',
      approved: 'check_circle',
      completed: 'done_all',
      rejected: 'cancel'
    };
    return icons[status] || 'help';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }
}
