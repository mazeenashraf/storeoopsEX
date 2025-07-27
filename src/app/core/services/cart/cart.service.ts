import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {}

  addToCart(productId: string, color: string, size: string): Observable<any> {
    const token = sessionStorage.getItem('userToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      productId,
      quantity: 1,
      color,
      size
    };

    return this.httpClient.post(
      `https://local-brand-store.onrender.com/api/cart`,
      body,
      { headers }
    );
  }

getCart(): Observable<any> {
  const token = sessionStorage.getItem('userToken');

  return this.httpClient.get(
    `https://local-brand-store.onrender.com/api/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

removeCart(cartid: string, color: string, size: string): Observable<any> {
  const token = sessionStorage.getItem('userToken');

  return this.httpClient.delete(
    `https://local-brand-store.onrender.com/api/cart/${cartid}/${color}/${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

updateQuantity(id:string , newcount:number , color:string , size:string):Observable<any>{
    const token = sessionStorage.getItem('userToken');

return this.httpClient.patch(`https://local-brand-store.onrender.com/api/cart/${id}/${color}/${size}` , {
  "quantity": newcount,

} , {
  headers:{
     Authorization: `Bearer ${token}`
  }
} )
}

clearcart():Observable<any>{
  const token = sessionStorage.getItem('userToken')
  return this.httpClient.delete(`https://local-brand-store.onrender.com/api/cart` , {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

}
