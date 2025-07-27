import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AddproductadminService {

  constructor(private httpClient: HttpClient) {}

  createproduct(productData: {
    category: string,
    title: string,
    description: string,
    originalPrice: number,
    variants: any[],
    images: File[]
  }): Observable<any> {
    const formData = new FormData();

    formData.append('category', productData.category);
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('originalPrice', productData.originalPrice.toString());
    formData.append('variants', JSON.stringify(productData.variants));

    for (let i = 0; i < productData.images.length; i++) {
      formData.append('images', productData.images[i]);
    }

    const token = sessionStorage.getItem("userToken");

    return this.httpClient.post(`https://local-brand-store.onrender.com/api/product`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: res?.message || 'Product added successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      }),
      catchError((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Product',
          text: err?.error?.message || 'Something went wrong.',
        });
        return throwError(() => err);
      })
    );
  }
}
