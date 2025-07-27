import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { Icart } from '../../shared/interfaces/icart';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink , NgIf ,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit  {
  cartDetails: Icart = {} as Icart;
  private readonly cartService = inject(CartService);

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        console.log("cartdetails", this.cartDetails);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeCart(id: string, color: string, size: string) {
    this.cartService.removeCart(id, color, size).subscribe({
      next: (res) => {
        console.log('Deleted:', res);
        this.cartDetails = res.cart;

        // ✅ SweetAlert - حذف منتج واحد
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Product has been removed from the cart.',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove the product.',
        });
      }
    });
  }

  updatecount(id: string, count: number, color: string, size: string): void {
    this.cartService.updateQuantity(id, count, color, size).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.cart;

        // ✅ SweetAlert - تحديث الكمية
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Quantity updated successfully!',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Oops! We don’t have more of this item in stock.',
        });
      }
    });
  }

  clearCart(): void {
    this.cartService.clearcart().subscribe({
      next: (res) => {
        console.log("remove cart", res);
        this.cartDetails.items = [];
        this.cartDetails.subTotal = 0;

        // ✅ SweetAlert - مسح الكارت كله
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared',
          text: 'Your cart has been successfully cleared.',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while clearing the cart!',
        });
      }
    });
  }

  ngOnInit(): void {
    this.getCart();
  }
}
