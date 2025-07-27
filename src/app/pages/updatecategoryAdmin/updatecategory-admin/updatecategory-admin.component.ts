import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // لازم لـ ngModel
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatecategory-admin.component.html',
  styleUrls: ['./updatecategory-admin.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: string = '';
  categoryName: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // الحصول على id من رابط الصفحة (param)
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    if (this.categoryId) {
      this.loadCategory();
    } else {
      Swal.fire('Error', 'Invalid category ID.', 'error');
      this.router.navigate(['/categories']);  // ارجع لقائمة الفئات إذا ما في id
    }
  }

  loadCategory(): void {
    this.categoriesService.getCategoryById(this.categoryId).subscribe({
      next: (res) => {
        this.categoryName = res.name;
      },
      error: (err) => {
        Swal.fire('Error', err, 'error');
        console.error(err);
      }
    });
  }

  updateCategory(): void {
    if (!this.categoryName.trim()) {
      Swal.fire('Warning', 'Category name cannot be empty.', 'warning');
      return;
    }

    this.categoriesService.updateCategory(this.categoryId, { name: this.categoryName }).subscribe({
      next: () => {
        Swal.fire('Success', 'Category updated successfully!', 'success').then(() => {
          this.router.navigate(['/allcategoriesadmin']);  // عدل الرابط حسب مسار قائمة الفئات عندك
        });
      },
      error: (err) => {
        Swal.fire('Error', err , 'error');
        console.error(err);
      }
    });
  }
}