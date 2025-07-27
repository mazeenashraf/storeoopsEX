import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UpdateproductadminService {
  constructor(private httpClient: HttpClient) {}

  updateproductadmin(id: string, formData: FormData): Observable<any> {
    const token = sessionStorage.getItem('userToken');

    return this.httpClient.put(`https://local-brand-store.onrender.com/api/product/${id}`, formData, {
      headers: {
        Authorization:` Bearer ${token}`
      }
    }).pipe(
      tap((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Updated',
          text: res?.message || 'Product updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      }),
      catchError((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Product',
          text: err?.error?.message || 'Something went wrong.'
        });
        return throwError(() => err);
      })
    );
  }

  getProductById(id: string): Observable<any> {
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/product/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.httpClient.get('https://local-brand-store.onrender.com/api/category');
  }
}
