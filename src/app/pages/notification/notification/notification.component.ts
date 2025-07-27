import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { Inotifaction } from '../../../shared/interfaces/inotification';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationDropdownComponent implements OnInit {
  isOpen = false;
  notifications: Inotifaction[] = [];

  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.getNotifications();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  markAllAsRead() {
    console.log('All marked as read');
  }

  markAllAsUnread() {
    console.log('All marked as unread');
  }

  clearAll() {
    this.notifications = [];
  }

  getNotifications(): void {
  this.notificationService.getNotifiction().subscribe({
    next: (res) => {
      console.log('Notification response:', res);

      // عدل هنا بناءً على شكل الـ JSON
      this.notifications = res.notifications || [];
    },
    error: (err) => {
      console.error('Error loading notifications:', err);
    }
  });
}


clearNotifaction(): void {
  this.notificationService.clearNotification().subscribe({
    next: (res) => {
      console.log('Notifications cleared from server:', res);
      this.notifications = []; // مسح الداتا من الواجهة بعد المسح من السيرفر
    },
    error: (err) => {
      console.error('Error clearing notifications:', err);
    }
  });
}

}
