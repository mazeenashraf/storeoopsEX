import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private  httpClient:HttpClient) { }
  updateProfile(data:any):Observable<any>{
    const token = sessionStorage.getItem('userToken')
    return this.httpClient.put(`https://local-brand-store.onrender.com/api/user/profile` , data , {
      headers:{
        Authorization: `Bearer ${token}`
      }
    } )
  }
}
