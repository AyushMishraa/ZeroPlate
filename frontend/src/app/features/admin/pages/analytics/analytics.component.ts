import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { AnalyticsSummary, TopDonor } from '../../../../core/models';

@Component({
  selector: 'app-analytics',
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
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  isLoading = true;
  summary: AnalyticsSummary | null = null;
  topDonors: TopDonor[] = [];
  displayedColumns = ['rank', 'name', 'email', 'donations', 'quantity'];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadAnalytics();
    this.loadTopDonors();
  }

  loadAnalytics(): void {
    this.analyticsService.getAnalyticsSummary().subscribe({
      next: (response) => {
        this.summary = response.data ?? null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load analytics:', error);
        this.isLoading = false;
      }
    });
  }

  loadTopDonors(): void {
    this.analyticsService.getTopDonors(10).subscribe({
      next: (response) => {
        this.topDonors = response.data || [];
      },
      error: (error) => {
        console.error('Failed to load top donors:', error);
      }
    });
  }

  calculateCO2(): number {
    return Math.round((this.summary?.totalMealsSaved || 0) * 2.5);
  }
}
