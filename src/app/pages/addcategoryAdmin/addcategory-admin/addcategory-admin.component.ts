import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-addcategory-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addcategory-admin.component.html',
  styleUrls: ['./addcategory-admin.component.css']
})
export class AddcategoryAdminComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;

      this.categoriesService.addCategory(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Category added successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/allcategoriesadmin']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Failed to add the category.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Required field',
        text: 'Please enter the category name.',
      });
    }
  }
}