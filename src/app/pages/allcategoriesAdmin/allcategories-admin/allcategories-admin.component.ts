import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule , RouterLink],
  templateUrl: './allcategories-admin.component.html',
  styleUrls: ['./allcategories-admin.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getallcategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load categories.', 'error');
        console.error('Error loading categories', err);
      }
    });
  }

  editCategory(id: string): void {
    this.router.navigate(['/updatecategoryadmin', id]);
  }

  deleteCategory(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            this.loadCategories();
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to delete category.', 'error');
            console.error('Delete error', err);
          }
        });
      }
    });
  }
}