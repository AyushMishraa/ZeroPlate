import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatChipsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  stats = [
    { label: 'Food Saved', value: '1,234', icon: 'restaurant', color: 'text-green-600' },
    { label: 'Communities Fed', value: '567', icon: 'groups', color: 'text-blue-600' },
    { label: 'Active Donors', value: '89', icon: 'volunteer_activism', color: 'text-purple-600' },
    { label: 'NGOs Connected', value: '45', icon: 'handshake', color: 'text-pink-600' }
  ];

  features = [
    {
      title: 'List Surplus Food',
      description: 'Restaurants and supermarkets can easily list their surplus food items',
      icon: 'add_shopping_cart',
      color: 'bg-blue-500'
    },
    {
      title: 'Smart Matching',
      description: 'AI-powered matching connects donors with nearby NGOs and food banks',
      icon: 'psychology',
      color: 'bg-purple-500'
    },
    {
      title: 'Track Impact',
      description: 'Monitor your contribution to reducing food waste in real-time',
      icon: 'analytics',
      color: 'bg-green-500'
    },
    {
      title: 'Community Network',
      description: 'Join a growing network of organizations fighting food waste',
      icon: 'people',
      color: 'bg-pink-500'
    }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }

  getRoleBadgeColor(role: string): string {
    switch (role) {
      case 'donor':
        return 'bg-green-100 text-green-800';
      case 'receiver':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'donor':
        return 'Donor';
      case 'receiver':
        return 'Receiver';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  }
}

