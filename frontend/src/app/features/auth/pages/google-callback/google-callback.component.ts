import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Extract user and token from query parameters
    this.route.queryParams.subscribe(params => {
      const user = params['user'];
      const token = params['token'];

      if (user && token) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          this.authService.handleGoogleCallback(userData, token);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          this.router.navigate(['/auth/login']);
        }
      } else {
        // No user/token, redirect to login
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
