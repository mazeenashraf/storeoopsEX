import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/Dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any = null;
  totalOrders: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashBoard().subscribe({
      next: (res) => {
        this.dashboardData = res;
        this.totalOrders = res?.totalOrders || 0;
      },
      error: (err) => console.error('Error loading dashboard data:', err)
    });
  }

  getBarHeight(count: number): number {
    if (!this.totalOrders) return 5;
    const percent = (count / this.totalOrders) * 100;
    return Math.max(percent, 5);
  }
}