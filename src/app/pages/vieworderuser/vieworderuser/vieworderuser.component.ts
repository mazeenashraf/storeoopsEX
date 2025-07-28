import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserordersService } from '../../../core/services/userorders/userorders.service';
import { Iuserorder } from '../../../shared/interfaces/Iuserorder/iuserorder';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vieworderuser',
  standalone: true,
  imports: [CommonModule , NgFor , ],
  templateUrl: './vieworderuser.component.html',
  styleUrl: './vieworderuser.component.css'
})
export class VieworderuserComponent implements OnInit {
  private userordersService = inject(UserordersService);
  private route = inject(ActivatedRoute);

  orderData: Iuserorder = {} as Iuserorder;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getsingleorder(id);
    }
  }

  getsingleorder(id: string): void {
    this.userordersService.getsingleOrder(id).subscribe({
      next: (res) => {
        console.log('Single Order:', res);
        this.orderData = res.order;
      },
      error: (err) => {
        console.error('Error loading order:', err);
      }
    });
  }

  cancelorder(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userordersService.cancelorder(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Order Cancelled',
              text: 'Your order has been successfully cancelled.',
              confirmButtonColor: '#3085d6'
            });
            this.getsingleorder(id); // تحديث البيانات بعد الكنسلة
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Cancellation Failed',
              text: err.error?.message || 'Something went wrong!',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
