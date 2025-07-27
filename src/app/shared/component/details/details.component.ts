import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { Idetails } from '../../interfaces/Idetails/idetails';
import { RegisterService } from '../../../core/services/register/register.service';
import { CartService } from '../../../core/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private registerService = inject(RegisterService);

  detailsProduct: Idetails = {} as Idetails;
  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.productsService.getSpecificProduct(id).subscribe({
            next: (res) => {
              this.detailsProduct = res.product;
              this.selectedImage = this.detailsProduct.imageUrl;
            },
            error: (err) => {
              console.error('Error loading product details:', err);
            }
          });
        }
      }
    });
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(id: string): void {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
      const currentUrl = this.router.url;
      sessionStorage.setItem('redirectAfterLogin', currentUrl);
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedColor || !this.selectedSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select both color and size!',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    this.cartService.addToCart(id, this.selectedColor, this.selectedSize).subscribe({
      next: (res) => {
        console.log('Added to cart:', res.cart);
        Swal.fire({
          icon: 'success',
          title: 'Product added to cart successfully!',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (err) => {
        console.error('Add to cart error:', err);
        if (err?.status === 401 || err?.error?.message?.includes('not logged in')) {
          const currentUrl = this.router.url;
          sessionStorage.setItem('redirectAfterLogin', currentUrl);
          this.router.navigate(['/login']);
        } else if (err?.error?.message?.includes('Insufficient quantity')) {
          Swal.fire({
            icon: 'error',
            title: 'Not enough stock available.',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error?.message || 'Something went wrong',
          });
        }
      }
    });
  }
}

