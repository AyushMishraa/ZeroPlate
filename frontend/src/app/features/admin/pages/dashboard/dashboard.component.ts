import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../../../core/services/admin.service';
import { DashboardStats, PendingPickup } from '../../../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  isLoading = true;
  stats: DashboardStats | null = null;
  pendingPickups: PendingPickup[] = [];
  displayedColumns = ['food', 'donor', 'receiver', 'status', 'date'];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadPendingPickups();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        this.stats = response.data ?? null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load dashboard:', error);
        this.isLoading = false;
      }
    });
  }

  loadPendingPickups(): void {
    this.adminService.getPendingPickups().subscribe({
      next: (response) => {
        this.pendingPickups = response.data?.pendingClaims || [];
      },
      error: (error) => {
        console.error('Failed to load pending pickups:', error);
      }
    });
  }

  getPercentage(count: number): number {
    if (!this.stats?.foodByType) return 0;
    const total = this.stats.foodByType.reduce((sum, type) => sum + type.count, 0);
    return total > 0 ? (count / total) * 100 : 0;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
