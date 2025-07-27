import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserordersService {

  constructor( private httpClient:HttpClient ) { }
  getOrder():Observable<any>{
    const token = sessionStorage.getItem('userToken')
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/order/user` ,
      {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
    )
  }
  getsingleOrder(id:string):Observable<any>{
     const token = sessionStorage.getItem('userToken')
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/order/${id}` , {
 headers:{
          Authorization : `Bearer ${token}`
        }

    })
  }
  cancelorder(id:string):Observable<any>{
         const token = sessionStorage.getItem('userToken')

    return this.httpClient.delete(`https://local-brand-store.onrender.com/api/order/${id}/cancel` , {
      headers:{
         Authorization : `Bearer ${token}`
      }
    }  )
  }
}
