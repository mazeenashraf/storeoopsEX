import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get('https://local-brand-store.onrender.com/api/product');
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/product/${id}`);
  }

  deleteProduct(id: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    return this.httpClient.delete(`https://local-brand-store.onrender.com/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  applyDiscount(id: string, type: string, amount: number): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    return this.httpClient.patch(`https://local-brand-store.onrender.com/api/discount/${id}/apply`, {
      type,
      amount
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  removeDiscount(id: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    return this.httpClient.patch(`https://local-brand-store.onrender.com/api/discount/${id}/remove`, {
      type: null,
      amount: null
    }, {
      headers: {
        Authorization:` Bearer ${token}`
      }
    });
  }
}
