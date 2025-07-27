import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/ordersadmin/ordersadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './allordersadmin.component.html',
  styleUrl: './allordersadmin.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  selectedStatus: string = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.orders;
        this.applyFilter();
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  applyFilter() {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    }
  }

  filterByStatus(status: string, event?: Event) {
    event?.preventDefault(); // لمنع التنقل التلقائي من href
    this.selectedStatus = status;
    this.applyFilter();
  }

  deleteOrder(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This order will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe({
          next: () => {
            this.orders = this.orders.filter(order => order._id !== id);
            this.applyFilter();
            Swal.fire('Deleted!', 'Order has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting order:', err);
            Swal.fire('Error', 'Failed to delete order.', 'error');
          }
        });
      }
    });
  }

  changeStatus(orderId: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        const order = this.orders.find(o => o._id === orderId);
        if (order) {
          order.status = newStatus;
        }
        this.applyFilter();
        Swal.fire('Success', 'Order status updated!', 'success');
      },
      error: (err) => {
        console.error('Error updating status:', err);
        Swal.fire('Error', 'Failed to update status.', 'error');
      }
    });
  }
}