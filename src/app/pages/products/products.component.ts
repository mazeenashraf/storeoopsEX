import { Component, OnInit, inject, computed } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';
import { Itshirts } from '../../shared/interfaces/Itshirts/itshirts';
import { Ipants } from '../../shared/interfaces/Ipants/ipants';
import { Ishorts } from '../../shared/interfaces/Ishorts/ishorts';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone: true,
})
export class ProductsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  Tshirts: Itshirts[] = [];
  Pants: Ipants[] = [];
  SHORTS: Ishorts[] = [];

  getTshirt(): void {
    this.categoriesService.getcategorybytshirt().subscribe({
      next: (res) => {
        this.Tshirts = res.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPants(): void {
    this.categoriesService.getcategorybypants().subscribe({
      next: (res) => {
        this.Pants = res.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getshorts(): void {
    this.categoriesService.getcategorybyShorts().subscribe({
      next: (res) => {
        this.SHORTS = res.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isSoldOut(product: any): boolean {
    if (!product.variants || product.variants.length === 0) {
      return true;
    }

    return product.variants.every(
      (variant: any) => variant.quantity === 0
    );
  }

  ngOnInit(): void {
    this.getTshirt();
    this.getPants();
    this.getshorts();
  }
}
