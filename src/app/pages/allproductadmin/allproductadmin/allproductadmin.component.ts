import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproductadmin',
  templateUrl: './allproductadmin.component.html',
  styleUrls: ['./allproductadmin.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, RouterLink]
})
export class AllproductadminComponent implements OnInit {
  myproductsadmin: Iproducts[] = [];
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getallproductsadmin();
  }

  getallproductsadmin(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.myproductsadmin = res.products;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getDiscountText(product: Iproducts): string {
    if (!product.discount) return '–';
    if (product.discount.type === 'percentage') return `${product.discount.amount}% OFF`;
    return `${product.discount.amount} EGP OFF`;
  }

  getImage(product: Iproducts): string {
    return product.imageUrl || (product.images?.length ? product.images[0].url : '');
  }

  applyDiscount(productId: string, type: string, amount: number): void {
    if (!amount || amount <= 0) {
      Swal.fire('Error', 'Please enter a valid discount amount.', 'error');
      return;
    }

    this.productsService.applyDiscount(productId, type, amount).subscribe({
      next: () => {
        Swal.fire('Success', 'Discount applied successfully.', 'success');
        this.getallproductsadmin();
      },
      error: (err) => {
  console.error('Apply Discount Error:', err);
  Swal.fire('Error', err.error?.message || 'Failed to apply discount.', 'error');
}
    });
  }

  removeDiscount(productId: string): void {
    this.productsService.removeDiscount(productId).subscribe({
      next: () => {
        Swal.fire('Success', 'Discount removed successfully.', 'success');
        this.getallproductsadmin();
      },
     error: (err) => {
  console.error('Remove Discount Error:', err);
  Swal.fire('Error', err.error?.message || 'Failed to remove discount.', 'error');
}
    });
  }

  deleteProduct(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            this.getallproductsadmin();
          },
          error: () => {
            Swal.fire('Failed!', 'Something went wrong while deleting the product.', 'error');
          }
        });
      }
    });
  }
}