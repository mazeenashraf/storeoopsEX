import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserordersService } from '../../core/services/userorders/userorders.service';
import { Iuserorder } from '../../shared/interfaces/Iuserorder/iuserorder';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  myOrder: Iuserorder[] = [];

  private orderService = inject(UserordersService);

ngOnInit(): void {
  this.orderService.getOrder().subscribe({
    next: (res) => {
      console.log("myorders", res);
      this.myOrder = res.orders; // ✅ صح
    },
    error: (err) => {
      console.error(err);
    }
  });
}

}
