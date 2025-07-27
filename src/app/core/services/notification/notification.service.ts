import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private  httpClient:HttpClient ) { }
  getNotifiction():Observable<any>{
    const token = sessionStorage.getItem("userToken")
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/notification` , {
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
  }
      clearNotification():Observable<any>{
            const token = sessionStorage.getItem("userToken")

        return this.httpClient.delete(`https://local-brand-store.onrender.com/api/notification/clear` , {
          headers : {
        Authorization : `Bearer ${token}`

          }
        } )
      }

}
