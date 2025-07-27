import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private  httpClient:HttpClient) { }
  getDashBoard():Observable<any>{
    const token = sessionStorage.getItem('userToken')
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/admin/extended-stats` ,{
      headers :{
        Authorization :  `Bearer ${token} `
      }
    } )
  }
}
