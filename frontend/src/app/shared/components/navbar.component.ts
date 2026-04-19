import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';
import { SocketService, Notification } from '../../core/services/socket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = this.authService.isAuthenticated;
  userRole = this.authService.getRole.bind(this.authService);
  userName = () => this.authService.currentUser()?.name || '';
  notifications = () => this._notifications;
  notificationCount = () => this._notifications.length;

  private _notifications: Notification[] = [];

  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    // Subscribe to notifications
    this.socketService.notifications$.subscribe(notification => {
      this._notifications.unshift(notification);
      // Keep only last 10 notifications
      if (this._notifications.length > 10) {
        this._notifications = this._notifications.slice(0, 10);
      }
    });

    // Connect socket if authenticated
    const userId = this.authService.getUserId();
    if (userId) {
      this.socketService.connect(userId);
    }
  }

  logout(): void {
    this.socketService.disconnect();
    this.authService.logout();
  }

  getNotificationIcon(type: string): string {
    const icons: Record<string, string> = {
      claimCreated: 'shopping_basket',
      foodExpiring: 'warning',
      pickupReminder: 'event',
      foodClaimed: 'check_circle'
    };
    return icons[type] || 'notifications';
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
