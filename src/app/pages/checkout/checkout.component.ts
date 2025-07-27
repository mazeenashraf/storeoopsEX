import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common'; // ضروري عشان نستخدم *ngFor

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);

  checkoutForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    anotherPhone: new FormControl(null),
    addressLine: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    gov: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    notes: new FormControl(null)
  });

  // المحافظات مع الأسعار
  shippingPrices: { name: string; price: number }[] = [];

  private rawShippingPrices = {
    "Cairo": 85,
    "Tagamoa": 85,
    "Rehab": 85,
    "New Cairo City": 85,
    "Madinaty": 85,
    "Shorouk": 85,
    "Obour": 85,
    "Mostakbal City": 85,
    "Badr City": 85,
    "Giza": 85,
    "Mohandessin": 85,
    "Al Haram": 85,
    "Al Agouzah": 85,
    "Dokki": 85,
    "6th of October": 85,
    "October Gardens": 85,
    "Pyramids Gardens": 85
  };

  constructor() {
    this.shippingPrices = Object.entries(this.rawShippingPrices).map(([name, price]) => ({ name, price }));
  }

  submitform(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.checkoutService.checkout(this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log("checkout", res);

        Swal.fire({
          icon: 'success',
          title: 'Your order has been placed successfully 🎉',
          html: `
            <p>Order Number: <strong>${res.order.orderNumber}</strong></p>
            <p>Total Amount: <strong>${res.order.Total} EGP</strong></p>
          `,
          confirmButtonText: 'View Orders',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/orders']);
        });

        this.checkoutForm.reset();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Please try again later.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
