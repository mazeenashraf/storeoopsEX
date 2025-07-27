import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://local-brand-store.onrender.com/api/order';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('userToken'); // أو sessionStorage.getItem()
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all`, {
      headers: this.getHeaders()
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateOrderStatus(orderId: string, newStatus: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${orderId}/status`, { status: newStatus }, {
      headers: this.getHeaders()
    });
  }
  getOrderById(orderId: string) {

  return this.http.get<{ order: any }>(`https://local-brand-store.onrender.com/api/order/${orderId}`, {headers
    : this.getHeaders()
  });
}
}
