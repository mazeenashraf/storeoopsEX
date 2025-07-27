import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private readonly httpClient: HttpClient) {}

  checkout(data: any): Observable<any> {
    const token = sessionStorage.getItem('userToken');
    return this.httpClient.post(`https://local-brand-store.onrender.com/api/order`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
