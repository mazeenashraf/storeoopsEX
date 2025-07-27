import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddproductadminService } from '../../../core/services/addproductadmin/addproductadmin.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Iadmincat } from '../../../shared/interfaces/Iadmincat/iadmincat';
import Swal from 'sweetalert2';

interface Variant {
  size: string;
  color: string;
  quantity: number;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './addproductadmin.component.html',
  imports: [CommonModule, FormsModule]
})
export class AddProductComponent implements OnInit {

  title = '';
  description = '';
  category = '';
  originalPrice!: number;
  selectedImages: File[] = [];
  variants: Variant[] = [{ size: '', color: '', quantity: 1 }];

  mycat: Iadmincat[] = [];

  private addProductService = inject(AddproductadminService);
  private categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getallcategories().subscribe({
      next: (res: any) => {
        this.mycat = res.categories ?? res.data ?? res;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  onImagesSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedImages = Array.from(files);
  }

  addVariant(): void {
    this.variants.push({ size: '', color: '', quantity: 1 });
  }

  removeVariant(index: number): void {
    this.variants.splice(index, 1);
  }

  submitProduct(): void {
    const product = {
      category: this.category,
      title: this.title,
      description: this.description,
      originalPrice: this.originalPrice,
      variants: this.variants,
      images: this.selectedImages
    };

    this.addProductService.createproduct(product).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: res?.message || 'Product added successfully!',
          timer: 2000,
          showConfirmButton: false
        });

        // اختيارية: إعادة تعيين الفورم
        this.title = '';
        this.description = '';
        this.category = '';
        this.originalPrice = 0;
        this.selectedImages = [];
        this.variants = [{ size: '', color: '', quantity: 1 }];
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'Failed to add product.'
        });
      }
    });
  }
}
