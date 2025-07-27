import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UpdateproductadminService } from '../../../core/services/updateproductadmin/updateproductadmin.service';

@Component({
  selector: 'app-update-product-admin',
  standalone: true,
  templateUrl: './updateproductadmin.component.html',
  styleUrls: ['./updateproductadmin.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UpdateProductAdminComponent implements OnInit {

  productId: string = '';
  title: string = '';
  description: string = '';
  category: string = '';
  originalPrice: string = '';
  selectedImages: File[] = [];

  variants: { size: string; color: string; quantity: string }[] = [
    { size: '', color: '', quantity: '' }
  ];

  categories: { _id: string; name: string }[] = [];

  private productsService = inject(UpdateproductadminService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.getProductDetails(this.productId);
    this.getCategories();
  }

  getProductDetails(id: string): void {
    this.productsService.getProductById(id).subscribe({
      next: (res: any) => {
        const product = res.product;
        this.title = product.title;
        this.description = product.description;
        this.category = product.category._id;
        this.originalPrice = product.originalPrice.toString();
        this.variants = product.variants.map((v: any) => ({
          size: v.size,
          color: v.color,
          quantity: v.quantity.toString()
        }));
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load product data', 'error');
      }
    });
  }

  getCategories(): void {
    this.productsService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load categories', 'error');
      }
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }

  addVariant(): void {
    this.variants.push({ size: '', color: '', quantity: '' });
  }

  removeVariant(index: number): void {
    if (this.variants.length > 1) {
      this.variants.splice(index, 1);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const hasEmptyVariant = this.variants.some(
      v => !v.size.trim() || !v.color.trim() || v.quantity === ''
    );

    const numericOriginalPrice = Number(this.originalPrice);

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('category', this.category);
    formData.append('originalPrice', numericOriginalPrice.toString());

    for (const file of this.selectedImages) {
      formData.append('images', file);
    }

    const preparedVariants = this.variants.map(variant => ({
      size: variant.size,
      color: variant.color,
      quantity: Number(variant.quantity) || 0
    }));

    formData.append('variants', JSON.stringify(preparedVariants));

    this.productsService.updateproductadmin(this.productId, formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: res?.message || 'Product updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'Failed to update product.'
        });
      }
    });
  }
}