import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { CategoriesService } from './../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';

import { Iproducts } from '../../shared/interfaces/iproducts';
import { Itshirts } from '../../shared/interfaces/Itshirts/itshirts';
import { Ipants } from '../../shared/interfaces/Ipants/ipants';
import { Ishorts } from '../../shared/interfaces/Ishorts/ishorts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  allproudcts: Iproducts[] = [];
  Tshirtscat: Itshirts[] = [];
  pantscat: Ipants[] = [];
  shorts: Ishorts[] = [];

  ngOnInit(): void {
    this.loadAllProducts();
    this.getTshirts();
    this.getPants();
    this.getShorts();
  }

  private loadAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allproudcts = res.products;
        console.log('All products:', this.allproudcts);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  private getTshirts(): void {
    this.categoriesService.getcategorybytshirt().subscribe({
      next: (res) => {
        this.Tshirtscat = res.products;
        console.log('T-shirts:', this.Tshirtscat);
      },
      error: (err) => {
        console.error('Error loading T-shirts:', err);
      },
    });
  }

  private getPants(): void {
    this.categoriesService.getcategorybypants().subscribe({
      next: (res) => {
        this.pantscat = res.products;
        console.log('Pants:', this.pantscat);
      },
      error: (err) => {
        console.error('Error loading Pants:', err);
      },
    });
  }

  private getShorts(): void {
    this.categoriesService.getcategorybyShorts().subscribe({
      next: (res) => {
        this.shorts = res.products;
        console.log('Shorts:', this.shorts);
      },
      error: (err) => {
        console.error('Error loading Shorts:', err);
      },
    });
  }

  isSoldOut(product: Iproducts): boolean {
    return product.variants?.every((v) => v.quantity === 0) ?? false;
  }
}
