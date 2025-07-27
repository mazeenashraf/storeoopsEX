import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/ordersadmin/ordersadmin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-order-admin',
  templateUrl: './view-order-admin.component.html',
  styleUrls: ['./view-order-admin.component.css'],
  imports: [CommonModule]
})
export class ViewOrderAdminComponent implements OnInit {
  order: any = null;
  orderId: string = '';

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.fetchOrder();
    }
  }

  fetchOrder() {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (res) => {
        this.order = res.order;
      },
      error: (err) => {
        console.error('Error fetching order:', err);
      }
    });
  }

  getFullAddress(): string {
    const a = this.order?.shippingAddress;
    return `${a.addressLine}, ${a.city}, ${a.gov}, ${a.country}`;
  }
}